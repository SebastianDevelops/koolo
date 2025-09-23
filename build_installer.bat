@echo off
title D2RBot Installer Builder
echo 🔨 Building D2RBot Installer...

REM Create installer directory structure
if not exist "cmd\installer\d2lod" mkdir cmd\installer\d2lod
if not exist "cmd\installer\assets" mkdir cmd\installer\assets

REM First run create.bat to build everything
echo 🔨 Running create.bat to build D2RBot...
call create.bat
if %errorlevel% neq 0 (
    echo ERROR: create.bat failed!
    pause
    exit /b 1
)

REM Copy D2 LOD files to installer directory
echo 📦 Copying D2 LOD files...
xcopy /E /I /Y "cmd\d2rbot\d2lod\*" "cmd\installer\d2lod\" >nul

REM Copy build files to installer directory
echo 📦 Copying build files...
xcopy /E /I /Y "build\*" "cmd\installer\build\" >nul

REM Create compressed archives
echo 📦 Creating D2 LOD archive...
cd cmd\installer
powershell -Command "Compress-Archive -Path 'd2lod\*' -DestinationPath 'd2lod.zip' -Force"
echo 📦 Creating build archive...
powershell -Command "Compress-Archive -Path 'build\*' -DestinationPath 'build.zip' -Force"
cd ..\..

REM Verify archives were created
echo 🔍 Verifying archives...
if not exist "cmd\installer\d2lod.zip" (
    echo ERROR: d2lod.zip not created!
    pause
    exit /b 1
)
if not exist "cmd\installer\build.zip" (
    echo ERROR: build.zip not created!
    pause
    exit /b 1
)
echo ✅ Archive verification successful!

REM Build installer
echo 🔨 Building installer...
go build -ldflags="-s -w" -o d2rbot-installer.exe cmd\installer\main.go

REM Cleanup
echo 🧹 Cleaning up...
rmdir /s /q cmd\installer\d2lod
rmdir /s /q cmd\installer\build
del cmd\installer\d2lod.zip
del cmd\installer\build.zip

echo ✅ Build complete!
echo 📦 Installer created: d2rbot-installer.exe
pause