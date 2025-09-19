package action

import (
	"github.com/hectorgimenez/d2rbot/internal/context"
	"github.com/hectorgimenez/d2rbot/internal/game"
	"github.com/hectorgimenez/d2rbot/internal/ui"
	"github.com/hectorgimenez/d2rbot/internal/utils"
)

func SwitchToLegacyMode() {
	ctx := context.Get()
	ctx.SetLastAction("SwitchToLegacyMode")

	if ctx.CharacterCfg.ClassicMode && !ctx.Data.LegacyGraphics {
		ctx.Logger.Debug("Switching to legacy mode...")
		ctx.HID.PressKey(ctx.Data.KeyBindings.LegacyToggle.Key1[0])
		utils.Sleep(500) // Add small delay to allow the game to switch

		// Close the mini panel if option is enabled
		if ctx.CharacterCfg.CloseMiniPanel {
			utils.Sleep(100)
			ctx.HID.Click(game.LeftButton, ui.CloseMiniPanelClassicX, ui.CloseMiniPanelClassicY)
			utils.Sleep(100)
		}
	}
}
