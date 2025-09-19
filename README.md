# D2RBot - Complete User Guide

**D2RBot** is an advanced automation tool for Diablo II: Resurrected that can run your characters automatically, perform farming runs, manage inventory, and handle various game mechanics. This guide will walk you through everything you need to know to use D2RBot effectively.

## ⚠️ Important Disclaimer
**Using automation tools may result in account bans. Use at your own risk. This tool is for educational purposes only.**

---

## What D2RBot Can Do

### Supported Character Classes
- **Sorceress**: Blizzard, Nova, Lightning, Hydra Orb, Fireball, Fire Leveling
- **Paladin**: Hammerdin, FOH (Fist of Heavens), Leveling
- **Assassin**: Lightning Trapsin, Mosaic, Leveling
- **Barbarian**: Berserk (Travincal specialist)
- **Druid**: Tornado (Work in Progress)
- **Amazon**: Javazon (Work in Progress)

### Automated Features
- **Farming Runs**: 25+ different farming locations including Countess, Mephisto, Baal, Diablo, Cows, and more
- **Inventory Management**: Automatic item pickup, stashing, selling, and inventory organization
- **Health Management**: Auto-potion use for character and mercenary
- **Safety Features**: Chicken (emergency exit) when health is low
- **Item Management**: Auto-repair equipment, revive mercenary, use buffs
- **Advanced Features**: Gambling, cubing recipes, terror zone detection
- **Multi-Character Support**: Run multiple characters simultaneously

## System Requirements

### Essential Requirements
1. **Diablo II: Resurrected** - Latest version
2. **Diablo II: Lord of Destruction 1.13c** - **CRITICAL**: D2RBot will not work without this
3. **Windows Operating System** - Windows 10/11 recommended
4. **Game Settings**:
   - Resolution: **1280x720** (required)
   - Display Mode: **Windowed** (required)
   - Language: **English** (required)
   - Accessibility large fonts: **Disabled**

## Getting Started

### Step 1: Installation
1. **Install Diablo II: LOD 1.13c** (if not already installed)
2. **Download D2RBot** from the releases section
3. **Extract** the zip file to a folder of your choice
4. **Run d2rbot.exe** to start the application

### Step 2: Initial Setup
When you first run D2RBot, you'll see a setup wizard that will guide you through:
1. **Game Directory Setup**: Point D2RBot to your D2R and D2 LOD installations
2. **Character Configuration**: Create your first character profile
3. **Basic Settings**: Configure essential options

---

## Single Player Setup Guide

### Prerequisites for Single Player
1. **Create your character** in Diablo II: Resurrected
2. **Save your character** - it will be stored in:
   ```
   C:\Users\[YourName]\Saved Games\Diablo II Resurrected\mods\d2rbot\
   ```
3. **Set game language to English**

### Character Configuration for Single Player
1. **Open D2RBot** and click "Add Character"
2. **Step 1 - Basic Setup**:
   - **Configuration Name**: Choose a name (e.g., "MySorc")
   - **Character Class**: Select your character's class
   - **Character Name**: Enter your exact character name from the game

3. **Step 2 - Authentication**:
   - **Authentication Method**: Select "None (Single Player)"
   - **Leave username/password empty**
   - **Client Settings**: Configure as needed

4. **Step 3 - Game Settings**:
   - **Game Difficulty**: Choose Normal/Nightmare/Hell
   - **Max Game Length**: Set time limit (recommended: 300-600 seconds)

5. **Complete remaining steps** with your preferred settings

### Preparing Your Single Player Character

#### Essential Items in Inventory:
- **Town Portal Tome** (bind to a hotkey - REQUIRED)
- **Identify Tome**
- **Keys** (at least one stack)
- **Horadric Cube** (can be in stash or inventory)
- **Charms** (D2RBot can lock inventory slots to protect them)

#### Skill Bindings (Class-Specific):
- **Blizzard Sorceress**: Left skill = Glacial Spike or Ice Blast
- **Hammerdin**: Left skill = Blessed Hammer
- **FOH Paladin**: Left skill = FOH or Holy Bolt, Right skill = Conviction
- **Berserk Barbarian**: Left skill = Berserk
- **Other classes**: Ensure main attack skill is bound

---

## Online (Battle.net) Setup Guide

### Prerequisites for Online Play
1. **Valid Battle.net account**
2. **Character created on Battle.net**
3. **Authentication credentials**

### Authentication Methods

#### Method 1: Username & Password
1. **Step 2 - Authentication**:
   - **Authentication Method**: "Username & Password"
   - **Username**: Your Battle.net username
   - **Password**: Your Battle.net password
   - **Realm**: Select your region (EU/US/KR)

#### Method 2: Auth Token (Advanced)
1. **Authentication Method**: "Auth Token"
2. **Obtain your auth token** from Battle.net client
3. **Enter token** in the Authentication Token field
4. **Select realm**

### Online Game Settings
1. **Create Lobby Games**: Enable if you want public games
2. **Game Name Pattern**: Template for game names (e.g., "farm-")
3. **Game Password**: Leave blank for public, set password for private

---

## Character Setup Guide

### Dashboard Overview
After creating a character, you'll see the main dashboard with:
- **Character cards** showing status and stats
- **Control buttons**: Start, Stop, Pause
- **Real-time statistics**
- **Run progress tracking**

### Configuring Runs
1. **Go to character settings**
2. **Navigate to Step 5 - Runs & Automation**
3. **Drag and drop runs** between Enabled/Disabled lists
4. **Configure run-specific settings** by clicking on each run
5. **Enable "Randomize run order"** for variety

### Popular Run Configurations

#### Magic Find Setup:
- **Mephisto** (fast, good drops)
- **Ancient Tunnels** (no immunities)
- **Pindleskin** (quick runs)
- **Countess** (runes)

#### Leveling Setup:
- **Enable "leveling" run only**
- **Use leveling character classes**
- **Start at level 1** for auto-configuration

#### Rune Farming:
- **Countess** (low-mid runes)
- **Lower Kurast** (high runes)
- **Travincal** (high runes)

### Health and Safety Settings
1. **Step 4 - Combat & Health**:
   - **Healing at (%)**: When to use healing potions (recommended: 75%)
   - **Mana at (%)**: When to use mana potions (recommended: 15%)
   - **Chicken at (%)**: Emergency exit threshold (recommended: 30%)
   - **Mercenary settings**: Configure merc healing

2. **Belt Layout**: Configure potion types in each belt column
3. **Inventory Lock**: Check boxes to protect inventory slots

---

## Advanced Features

### Inventory Management
- **Pickit System**: Uses NIP files to determine which items to pick up
- **Auto-Stashing**: Automatically stores items in stash
- **Auto-Selling**: Sells unwanted items to vendors
- **Inventory Locking**: Protects specific inventory slots

### Companion Mode
1. **Enable Companion System** in Step 3
2. **Set one character as Leader**
3. **Other characters follow the leader**
4. **Leader creates games, followers join**

### Scheduler
1. **Enable Scheduler** in Step 3
2. **Set time ranges** for each day of the week
3. **Bot automatically starts/stops** during specified times
4. **Supports multiple time ranges per day**

### Gambling
1. **Enable in Step 6 - Advanced**
2. **Bot automatically gambles** when gold stash is full
3. **Configurable item types** to gamble

### Cube Recipes
1. **Enable in Step 6 - Advanced**
2. **Select specific recipes** to automate
3. **Gem upgrading, charm rolling, etc.**

---

## Running Your Bot

### Starting the Bot
1. **Open D2RBot dashboard**
2. **Click "Start" on your character card**
3. **Bot will launch D2R automatically**
4. **Monitor progress** in real-time

### Monitoring
- **Character Status**: In-game, Paused, Stopped
- **Current Run**: Which area is being farmed
- **Statistics**: Games completed, items found, deaths
- **Logs**: Detailed activity logs available in Logs tab

### Stopping the Bot
- **Stop Button**: Graceful shutdown after current game
- **Pause Button**: Temporary pause (can resume)
- **Emergency Stop**: Force quit if needed

---

## Troubleshooting

### Common Issues

#### "Character not found"
- **Check character name spelling**
- **Ensure character exists in correct mode** (Single Player vs Online)
- **Verify authentication settings**

#### "Game not launching"
- **Check D2R path in settings**
- **Verify D2 LOD 1.13c installation**
- **Run as Administrator**

#### "Bot not moving/acting"
- **Check game resolution** (must be 1280x720)
- **Verify windowed mode**
- **Check skill bindings**
- **Ensure TP tome is bound to hotkey**

#### "Items not being picked up"
- **Check pickit files** in config folder
- **Verify inventory space**
- **Check item filtering settings**

### Performance Tips
1. **Close unnecessary programs**
2. **Use SSD for better performance**
3. **Adjust game settings** for optimal performance
4. **Monitor system resources**

---

## Safety and Best Practices

### Account Safety
- **Use dedicated accounts** for botting
- **Don't bot on main accounts**
- **Take regular breaks**
- **Vary your patterns**

### Configuration Backup
- **Backup config folder** regularly
- **Export character settings** before major changes
- **Keep multiple configurations** for different purposes

### Monitoring
- **Check bot regularly**
- **Monitor for stuck situations**
- **Review logs for errors**
- **Watch for game updates** that might break compatibility

---

## Configuration Files

All settings are stored in the `config` directory:
- **d2rbot.yaml**: Global settings
- **config/[character]/config.yaml**: Character-specific settings
- **config/[character]/pickit/**: Item pickup rules
- **logs/**: Activity logs

You can manually edit these files for advanced customization, but the web interface is recommended for most users.

---

*This guide covers the essential aspects of using D2RBot. For advanced customization and troubleshooting, refer to the configuration files and logs. Remember to always use automation tools responsibly and at your own risk.*
