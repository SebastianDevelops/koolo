@echo off
echo D2RBot Configuration Migration Script
echo =====================================
echo.

if exist "config\koolo.yaml" (
    echo Found koolo.yaml, renaming to d2rbot.yaml...
    move "config\koolo.yaml" "config\d2rbot.yaml"
    echo Configuration file migrated successfully!
) else (
    echo No koolo.yaml found, checking for d2rbot.yaml...
    if exist "config\d2rbot.yaml" (
        echo d2rbot.yaml already exists, no migration needed.
    ) else (
        echo No configuration file found. Please run the application to create initial config.
    )
)

echo.
echo Migration complete! You can now run d2rbot.exe
pause