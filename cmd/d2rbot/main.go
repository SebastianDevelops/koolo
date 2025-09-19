package main

import (
	"context"
	"fmt"
	"log"
	"log/slog"
	_ "net/http/pprof"
	"runtime/debug"

	sloggger "github.com/hectorgimenez/d2rbot/cmd/d2rbot/log"
	"github.com/hectorgimenez/d2rbot/internal/bot"
	"github.com/hectorgimenez/d2rbot/internal/config"
	"github.com/hectorgimenez/d2rbot/internal/event"
	"github.com/hectorgimenez/d2rbot/internal/remote/discord"
	"github.com/hectorgimenez/d2rbot/internal/remote/telegram"
	"github.com/hectorgimenez/d2rbot/internal/server"
	"github.com/hectorgimenez/d2rbot/internal/utils"
	"github.com/hectorgimenez/d2rbot/internal/utils/winproc"
	"github.com/inkeliz/gowebview"
	"golang.org/x/sync/errgroup"
)

var (
	buildID   string
	buildTime string
)

// wrapWithRecover wraps a function with panic recovery logic
func wrapWithRecover(logger *slog.Logger, f func() error) func() error {
	return func() error {
		defer func() {
			if r := recover(); r != nil {
				stackTrace := debug.Stack()
				errMsg := fmt.Sprintf("panic recovered: %v\nStacktrace: %s", r, stackTrace)
				logger.Error(errMsg)
				sloggger.FlushLog()
			}
		}()
		return f()
	}
}

func main() {

	_ = buildID
	_ = buildTime

	err := config.Load()
	if err != nil {
		utils.ShowDialog("Error loading configuration", err.Error())
		log.Fatalf("Error loading configuration: %s", err.Error())
		return
	}

	logger, err := sloggger.NewLogger(config.D2RBot.Debug.Log, config.D2RBot.LogSaveDirectory, "")
	if err != nil {
		log.Fatalf("Error starting logger: %s", err.Error())
	}
	defer sloggger.FlushAndClose()

	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("fatal error detected, D2RBot will close with the following error: %v\n Stacktrace: %s", r, debug.Stack())
			logger.Error(err.Error())
			sloggger.FlushAndClose()
			utils.ShowDialog("D2RBot error :(", fmt.Sprintf("D2RBot will close due to an expected error, please check the latest log file for more info!\n %s", err.Error()))
		}
	}()

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	g, ctx := errgroup.WithContext(ctx)

	winproc.SetProcessDpiAware.Call() // Set DPI awareness to be able to read the correct scale and show the window correctly

	eventListener := event.NewListener(logger)
	manager := bot.NewSupervisorManager(logger, eventListener)
	scheduler := bot.NewScheduler(manager, logger)
	go scheduler.Start()
	srv, err := server.New(logger, manager)
	if err != nil {
		log.Fatalf("Error starting local server: %s", err.Error())
	}

	// Use wrapWithRecover for all goroutines to handle panics
	g.Go(wrapWithRecover(logger, func() error {
		defer cancel()
		displayScale := config.GetCurrentDisplayScale()
		w, err := gowebview.New(&gowebview.Config{URL: "http://localhost:8087", WindowConfig: &gowebview.WindowConfig{
			Title: "D2RBot",
			Size: &gowebview.Point{
				X: int64(1280 * displayScale),
				Y: int64(720 * displayScale),
			},
		}})
		if err != nil {
			w.Destroy()
			return fmt.Errorf("error creating webview: %w", err)
		}

		w.SetSize(&gowebview.Point{
			X: int64(1280 * displayScale),
			Y: int64(720 * displayScale),
		}, gowebview.HintFixed)

		defer w.Destroy()
		w.Run()

		return nil
	}))

	// Discord Bot initialization
	if config.D2RBot.Discord.Enabled {
		discordBot, err := discord.NewBot(config.D2RBot.Discord.Token, config.D2RBot.Discord.ChannelID, manager)
		if err != nil {
			logger.Error("Discord could not been initialized", slog.Any("error", err))
			return
		}

		eventListener.Register(discordBot.Handle)
		g.Go(wrapWithRecover(logger, func() error {
			return discordBot.Start(ctx)
		}))
	}

	// Telegram Bot initialization
	if config.D2RBot.Telegram.Enabled {
		telegramBot, err := telegram.NewBot(config.D2RBot.Telegram.Token, config.D2RBot.Telegram.ChatID, logger)
		if err != nil {
			logger.Error("Telegram could not been initialized", slog.Any("error", err))
			return
		}

		eventListener.Register(telegramBot.Handle)
		g.Go(wrapWithRecover(logger, func() error {
			return telegramBot.Start(ctx)
		}))
	}

	g.Go(wrapWithRecover(logger, func() error {
		defer cancel()
		return srv.Listen(8087)
	}))

	g.Go(wrapWithRecover(logger, func() error {
		defer cancel()
		return eventListener.Listen(ctx)
	}))

	g.Go(wrapWithRecover(logger, func() error {
		<-ctx.Done()
		logger.Info("D2RBot shutting down...")
		cancel()
		manager.StopAll()
		scheduler.Stop()
		err = srv.Stop()
		if err != nil {
			logger.Error("error stopping local server", slog.Any("error", err))
		}

		return err
	}))

	err = g.Wait()
	if err != nil {
		cancel()
		logger.Error("Error running D2RBot", slog.Any("error", err))
		return
	}

	sloggger.FlushAndClose()
}
