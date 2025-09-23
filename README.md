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

## Pickit Configuration Guide

### Understanding Pickit Files

D2RBot uses **NIP (Notpad Item Pickup)** files to determine which items to pick up during farming runs. These files contain rules written in a specific syntax that tells the bot exactly what items are valuable.

### Pickit Directory Structure

```
config/[character_name]/
├── pickit/                    # Main pickit rules (always active)
│   ├── crafted.nip           # Crafted items
│   ├── magic.nip             # Magic items
│   ├── misc.nip              # Miscellaneous items
│   ├── rare.nip              # Rare items
│   ├── set.nip               # Set items
│   ├── unid.nip              # Unidentified items
│   ├── unique.nip            # Unique items
│   └── white.nip             # White/normal items
└── pickit_leveling/           # Leveling-specific rules (leveling run only)
    ├── assassin.nip          # Assassin leveling items
    ├── leveling.nip          # General leveling items
    ├── paladin.nip           # Paladin leveling items
    ├── quest.nip             # Quest items
    └── sorceress_leveling.nip # Sorceress leveling items
```

### How Pickit Rules Work

#### Basic Syntax
```
[property] == value && [property2] >= value2 # [stat] >= value3 # comment
```

#### Rule Components:
1. **Item Properties**: `[name]`, `[type]`, `[quality]`, `[class]`
2. **Conditions**: `==` (equals), `>=` (greater/equal), `<=` (less/equal), `!=` (not equal)
3. **Stats**: `# [stat] >= value` (item must have this stat)
4. **Comments**: `// comment` (explanatory text)
5. **Max Quantity**: `# [maxquantity] == X` (limit pickup amount)

### Pickit Rule Examples

#### Unique Items
```nip
// Pick up Stone of Jordan rings
[type] == ring && [quality] == unique # [itemmaxmanapercent] >= 25

// Pick up Shako (Harlequin Crest)
[name] == shako && [quality] == unique && [flag] != ethereal # [defense] >= 141

// Pick up perfect Mara's Kaleidoscope
[type] == amulet && [quality] == unique # [itemallskills] == 2 && [fireresist] >= 30
```

#### Runes
```nip
// Pick up high runes
[name] == lemrune
[name] == pulrune
[name] == umrune
[name] == malrune
[name] == istrune
[name] == gulrune
[name] == vexrune
[name] == ohmrune
[name] == lorune
[name] == surrune
[name] == berrune
[name] == jahrune
[name] == chamrune
[name] == zodrune

// Pick up specific quantities of mid runes
[name] == helrune # # [maxquantity] == 5
[name] == korune # # [maxquantity] == 2
```

#### Bases for Runewords
```nip
// Spirit sword bases (Crystal Sword/Broad Sword with 4 sockets)
([Name] == CrystalSword || [Name] == BroadSword) && [Quality] <= Superior && [Flag] != Ethereal # [Sockets] == 4 # [MaxQuantity] == 1

// Call to Arms base (Flail with 5 sockets)
[Name] == Flail && [Quality] <= Superior && [Flag] != Ethereal # [Sockets] == 5 # [MaxQuantity] == 1

// Insight bases (4-socket polearms)
[type] == polearm && [quality] <= superior # [sockets] == 4 # [MaxQuantity] == 1

// Spirit shield base (Monarch with 4 sockets)
[name] == monarch && [quality] <= superior # [sockets] == 4 # [maxquantity] == 1
```

### Centralized vs Local Pickit

#### Local Pickit (Default)
- Each character has its own pickit folder
- Located in `config/[character_name]/pickit/`
- Allows character-specific item filtering
- Each character manages its own pickup rules independently

#### Centralized Pickit (Optional)
**Purpose**: Allows all characters to share the same pickit rules from a single location.

**Setup Process**:
1. **Set Centralized Path**: In D2RBot main settings, configure "Centralized Pickit Path" (e.g., `C:\D2RBot\shared_pickit\`)
2. **Enable Per Character**: Check "Use Centralized Pickit" in each character's settings
3. **Create Shared Folder**: Place your pickit files in the centralized directory

**Benefits**: 
- **Single Management Point**: Update pickit rules once, applies to all characters
- **Consistency**: All characters use identical item filtering
- **Easier Maintenance**: No need to duplicate pickit files across characters
- **Efficiency**: Modify pickup rules in one location

**How It Works**:
- When enabled, bot ignores local `config/[character]/pickit/` folder
- Uses files from the centralized pickit path instead
- Leveling pickit still works from `pickit_leveling/` subfolder
- Perfect for running multiple characters with similar item priorities

**Example Structure**:
```
C:\D2RBot\shared_pickit\
├── unique.nip           # Shared unique item rules
├── rare.nip             # Shared rare item rules
├── runes.nip            # Shared rune pickup rules
├── crafted.nip          # Shared crafted item rules
└── pickit_leveling/     # Leveling-specific rules
    ├── leveling.nip
    └── quest.nip
```

**When to Use Centralized Pickit**:
- Running multiple characters with similar goals (MF, rune farming, etc.)
- Want consistent item filtering across all characters
- Prefer managing pickup rules in one location
- Running companion setups where all characters should pick up same items

**When to Use Local Pickit**:
- Different characters have different purposes (MF sorc vs Rune barb)
- Want character-specific item filtering
- Prefer isolated pickit management per character
- Testing different pickup strategies

### Leveling Pickit System

When running the **"leveling"** run, D2RBot automatically includes additional pickit rules:

1. **Class-specific files**: `assassin.nip`, `paladin.nip`, `sorceress_leveling.nip`
2. **General leveling**: `leveling.nip` (if no class-specific file exists)
3. **Quest items**: `quest.nip` (always included)
4. **Priority**: Class-specific > General leveling > Quest items

### Common Item Properties

#### Quality Types
- `inferior` - Inferior items
- `normal` - Normal items
- `superior` - Superior items
- `magic` - Magic (blue) items
- `set` - Set (green) items
- `rare` - Rare (yellow) items
- `unique` - Unique (gold) items
- `crafted` - Crafted items

#### Item Classes
- `normal` - Normal difficulty items
- `exceptional` - Nightmare difficulty items
- `elite` - Hell difficulty items

#### Flags
- `ethereal` - Ethereal items
- `identified` - Identified items
- `socketed` - Items with sockets

### Advanced Pickit Tips

#### 1. Commenting Out Rules
```nip
// This rule is disabled
//[name] == shako && [quality] == unique

// This rule is active
[name] == shako && [quality] == unique
```

#### 2. Multiple Conditions
```nip
// Must meet ALL conditions (AND)
[type] == ring && [quality] == rare && [strength] >= 10 && [dexterity] >= 10

// Must meet ANY condition (OR)
([name] == CrystalSword || [name] == BroadSword) && [sockets] == 4
```

#### 3. Stat Requirements
```nip
// Item must have specific stats
[type] == amulet && [quality] == rare # [itemallskills] >= 2 && [strength] >= 20

// Multiple stat requirements
[type] == ring && [quality] == rare # [lifeleech] >= 5 && [manaleech] >= 5 && [tohit] >= 100
```

### Troubleshooting Pickit Issues

#### Items Not Being Picked Up
1. **Check file syntax**: Ensure proper NIP syntax
2. **Verify file location**: Must be in correct pickit directory
3. **Check inventory space**: Bot won't pick up if inventory is full
4. **Review item properties**: Use in-game item stats to write accurate rules
5. **Test with simple rules**: Start with basic rules like `[name] == itemname`

#### Too Many Items Being Picked Up
1. **Add stat requirements**: Make rules more specific
2. **Use maxquantity limits**: Prevent picking up too many of same item
3. **Comment out broad rules**: Disable overly general pickup rules

### Creating Custom Pickit Rules

1. **Identify the item**: Note exact name, type, and desired stats
2. **Write the rule**: Use proper NIP syntax
3. **Test the rule**: Run bot and verify pickup behavior
4. **Refine as needed**: Adjust conditions and stat requirements

### Example Character-Specific Pickits

#### Sorceress MF Build
```nip
// Focus on +skills and resistances
[type] == amulet && [quality] == rare # [itemallskills] >= 2
[type] == ring && [quality] == rare # [coldresist]+[fireresist]+[lightresist] >= 60
[name] == ormus && [quality] == unique # [passivecoldmastery] >= 15
```

#### Paladin Hammerdin
```nip
// Focus on +paladin skills and FCR
[type] == amulet && [quality] == rare # [itemaddpaladinskills] >= 2
[type] == ring && [quality] == rare # [fastercastrate] >= 10
[name] == hoto && [quality] == unique # [itemallskills] >= 3
```

This pickit system gives you complete control over what items D2RBot collects, allowing you to optimize farming efficiency for your specific goals and character builds.

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
- **Check pickit files** in config folder - ensure proper NIP syntax
- **Verify inventory space** - bot won't pick up if inventory is full
- **Check item filtering settings** - review pickit rules for accuracy
- **Test with simple rules** - start with basic `[name] == itemname` rules
- **Verify file location** - must be in correct character's pickit directory

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
