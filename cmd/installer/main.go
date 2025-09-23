package main

import (
	"archive/zip"
	"embed"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"
	"unsafe"
)

//go:embed d2lod.zip build.zip
var installerFiles embed.FS

var (
	user32             = syscall.NewLazyDLL("user32.dll")
	shell32            = syscall.NewLazyDLL("shell32.dll")
	ole32              = syscall.NewLazyDLL("ole32.dll")
	procMessageBox     = user32.NewProc("MessageBoxW")
	procSHBrowseForFolder = shell32.NewProc("SHBrowseForFolderW")
	procSHGetPathFromIDList = shell32.NewProc("SHGetPathFromIDListW")
	procCoInitialize   = ole32.NewProc("CoInitialize")
	procCoUninitialize = ole32.NewProc("CoUninitialize")
)

const (
	MB_OK           = 0x00000000
	MB_YESNO        = 0x00000004
	MB_ICONQUESTION = 0x00000020
	IDYES           = 6
	
	// Folder browser constants
	BIF_RETURNONLYFSDIRS = 0x00000001
	BIF_NEWDIALOGSTYLE   = 0x00000040
)

func main() {
	showWelcome()
	
	installDir := getInstallDirectory()
	if installDir == "" {
		return
	}
	
	fmt.Println("\n🚀 Starting D2RBot installation...")
	
	if err := createDirectories(installDir); err != nil {
		showError("Failed to create directories: " + err.Error())
		return
	}
	
	if err := extractD2LOD(installDir); err != nil {
		showError("Failed to integrate bot map logic: " + err.Error())
		return
	}
	
	if err := extractBuildFolder(installDir); err != nil {
		showError("Failed to extract D2RBot files: " + err.Error())
		return
	}
	
	if err := createUninstaller(installDir); err != nil {
		showError("Failed to create uninstaller: " + err.Error())
		return
	}
	
	createShortcuts(installDir)
	showComplete(installDir)
}

func showWelcome() {
	fmt.Println("╔══════════════════════════════════════════════════════════════╗")
	fmt.Println("║                     D2RBot Installer                        ║")
	fmt.Println("║                                                              ║")
	fmt.Println("║  Welcome to the D2RBot installation wizard!                 ║")
	fmt.Println("║  This will install D2RBot with embedded D2 LOD files.       ║")
	fmt.Println("║                                                              ║")
	fmt.Println("╚══════════════════════════════════════════════════════════════╝")
	fmt.Println()
}

func getInstallDirectory() string {
	// Use default directory - no custom selection
	defaultDir := filepath.Join(os.Getenv("USERPROFILE"), "D2RBot")
	
	fmt.Printf("📁 Installing to: %s\n\n", defaultDir)
	
	titlePtr, _ := syscall.UTF16PtrFromString("Confirm Installation")
	msgPtr, _ := syscall.UTF16PtrFromString(fmt.Sprintf("Install D2RBot to:\n%s\n\nContinue?", defaultDir))
	
	ret, _, _ := procMessageBox.Call(0, uintptr(unsafe.Pointer(msgPtr)), uintptr(unsafe.Pointer(titlePtr)), MB_YESNO|MB_ICONQUESTION)
	
	if ret != IDYES {
		return ""
	}
	
	return defaultDir
}

func createDirectories(installDir string) error {
	dirs := []string{
		installDir,
		filepath.Join(installDir, "d2lod"),
		filepath.Join(installDir, "tools"),
		filepath.Join(installDir, "config"),
		filepath.Join(installDir, "config", "template"),
	}
	
	for _, dir := range dirs {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return err
		}
	}
	
	return nil
}

func extractD2LOD(installDir string) error {
	fmt.Println("🗺️ Integrating bot map logic...")
	
	zipData, err := installerFiles.ReadFile("d2lod.zip")
	if err != nil {
		return fmt.Errorf("failed to read d2lod.zip: %w", err)
	}
	
	tmpFile, err := os.CreateTemp("", "d2lod*.zip")
	if err != nil {
		return err
	}
	defer os.Remove(tmpFile.Name())
	defer tmpFile.Close()
	
	if _, err := tmpFile.Write(zipData); err != nil {
		return err
	}
	tmpFile.Close()
	
	reader, err := zip.OpenReader(tmpFile.Name())
	if err != nil {
		return err
	}
	defer reader.Close()
	
	totalFiles := len(reader.File)
	for i, file := range reader.File {
		progress := float64(i+1) / float64(totalFiles) * 100
		fmt.Printf("\r🗺️ Installing bot map logic... %.1f%% (%d/%d)", progress, i+1, totalFiles)
		
		if err := extractZipFile(file, filepath.Join(installDir, "d2lod")); err != nil {
			return err
		}
	}
	
	fmt.Println("\n✅ Bot mapping logic integrated successfully!")
	return nil
}

func extractEmbeddedDir(srcDir, destDir string) error {
	entries, err := installerFiles.ReadDir(srcDir)
	if err != nil {
		// Skip missing directories instead of failing
		fmt.Printf("Warning: Skipping missing directory %s\n", srcDir)
		return nil
	}
	
	for _, entry := range entries {
		srcPath := filepath.Join(srcDir, entry.Name())
		destPath := filepath.Join(destDir, entry.Name())
		
		if entry.IsDir() {
			if err := os.MkdirAll(destPath, 0755); err != nil {
				return err
			}
			if err := extractEmbeddedDir(srcPath, destPath); err != nil {
				return err
			}
		} else {
			data, err := installerFiles.ReadFile(srcPath)
			if err != nil {
				// Skip missing files instead of failing
				fmt.Printf("Warning: Skipping missing file %s\n", srcPath)
				continue
			}
			if err := os.WriteFile(destPath, data, 0644); err != nil {
				return err
			}
		}
	}
	
	return nil
}

func extractZipFile(file *zip.File, destDir string) error {
	reader, err := file.Open()
	if err != nil {
		return err
	}
	defer reader.Close()
	
	path := filepath.Join(destDir, file.Name)
	
	if file.FileInfo().IsDir() {
		return os.MkdirAll(path, file.FileInfo().Mode())
	}
	
	if err := os.MkdirAll(filepath.Dir(path), 0755); err != nil {
		return err
	}
	
	fileWriter, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, file.FileInfo().Mode())
	if err != nil {
		return err
	}
	defer fileWriter.Close()
	
	_, err = io.Copy(fileWriter, reader)
	return err
}

func createUninstaller(installDir string) error {
	fmt.Println("📦 Creating uninstaller...")
	
	uninstallerCode := fmt.Sprintf(`@echo off
title D2RBot Uninstaller
echo Uninstalling D2RBot...
cd /d "%s"
taskkill /f /im d2rbot.exe 2>nul
timeout /t 2 /nobreak >nul
rd /s /q "%s"
echo D2RBot has been uninstalled.
pause
del "%%~f0"`, installDir, installDir)
	
	uninstallerPath := filepath.Join(installDir, "uninstall.bat")
	return os.WriteFile(uninstallerPath, []byte(uninstallerCode), 0755)
}

func extractBuildFolder(installDir string) error {
	fmt.Println("📦 Extracting D2RBot files...")
	
	zipData, err := installerFiles.ReadFile("build.zip")
	if err != nil {
		return fmt.Errorf("failed to read build.zip: %w", err)
	}
	
	tmpFile, err := os.CreateTemp("", "build*.zip")
	if err != nil {
		return err
	}
	defer os.Remove(tmpFile.Name())
	defer tmpFile.Close()
	
	if _, err := tmpFile.Write(zipData); err != nil {
		return err
	}
	tmpFile.Close()
	
	reader, err := zip.OpenReader(tmpFile.Name())
	if err != nil {
		return err
	}
	defer reader.Close()
	
	totalFiles := len(reader.File)
	for i, file := range reader.File {
		progress := float64(i+1) / float64(totalFiles) * 100
		fmt.Printf("\r📦 Extracting D2RBot files... %.1f%% (%d/%d)", progress, i+1, totalFiles)
		
		if err := extractZipFile(file, installDir); err != nil {
			return err
		}
	}
	
	fmt.Println("\n✅ D2RBot files extracted successfully!")
	return nil
}

func createShortcuts(installDir string) {
	fmt.Println("📦 Creating shortcuts...")
	
	desktopPath := filepath.Join(os.Getenv("USERPROFILE"), "Desktop")
	shortcutPath := filepath.Join(desktopPath, "D2RBot.lnk")
	
	// Create a proper Windows shortcut using PowerShell
	powershellCmd := fmt.Sprintf(`$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut("%s"); $Shortcut.TargetPath = "%s"; $Shortcut.WorkingDirectory = "%s"; $Shortcut.Save()`, 
		shortcutPath, filepath.Join(installDir, "d2rbot.exe"), installDir)
	
	// Fallback to batch file if PowerShell fails
	exec.Command("powershell", "-Command", powershellCmd).Run()
	
	// Also create a batch file as backup
	batchPath := filepath.Join(desktopPath, "D2RBot.bat")
	batchContent := fmt.Sprintf(`@echo off
cd /d "%s"
start "" "d2rbot.exe"`, installDir)
	os.WriteFile(batchPath, []byte(batchContent), 0755)
}

func showComplete(installDir string) {
	fmt.Println("\n🎉 Installation completed successfully!")
	fmt.Printf("📁 D2RBot installed to: %s\n", installDir)
	fmt.Println("🖥️  Desktop shortcut created")
	fmt.Println("\n✨ You can now run D2RBot from:")
	fmt.Printf("   • Desktop shortcut\n")
	fmt.Printf("   • %s\\d2rbot.exe\n", installDir)
	
	titlePtr, _ := syscall.UTF16PtrFromString("Installation Complete")
	msgPtr, _ := syscall.UTF16PtrFromString("D2RBot has been installed successfully!")
	
	procMessageBox.Call(0, uintptr(unsafe.Pointer(msgPtr)), uintptr(unsafe.Pointer(titlePtr)), MB_OK)
	
	fmt.Println("\nPress Enter to exit...")
	fmt.Scanln()
}

func showError(message string) {
	fmt.Printf("❌ Error: %s\n", message)
	
	titlePtr, _ := syscall.UTF16PtrFromString("Installation Error")
	msgPtr, _ := syscall.UTF16PtrFromString(message)
	
	procMessageBox.Call(0, uintptr(unsafe.Pointer(msgPtr)), uintptr(unsafe.Pointer(titlePtr)), MB_OK)
	
	if strings.Contains(message, "Access is denied") {
		fmt.Println("\n💡 Tip: Try running the installer as Administrator, or choose a different directory.")
	}
	
	fmt.Println("Press Enter to exit...")
	fmt.Scanln()
}