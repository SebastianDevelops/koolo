// Guide functionality
class GuideManager {
    constructor() {
        this.sections = [
            'getting-started',
            'single-player', 
            'online-setup',
            'character-setup',
            'pickit-guide',
            'advanced-features',
            'troubleshooting'
        ];
        this.completedSections = JSON.parse(localStorage.getItem('guide-progress') || '[]');
        this.currentSection = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
        this.loadSectionContent();
    }

    bindEvents() {
        // Section card clicks
        document.querySelectorAll('.section-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });

        // Checklist items
        document.querySelectorAll('.checklist input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', this.updateQuickStartProgress.bind(this));
        });
    }

    showSection(sectionId) {
        this.currentSection = sectionId;
        
        // Update active states
        document.querySelectorAll('.section-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Load section content
        this.loadSectionContent(sectionId);
    }

    loadSectionContent(sectionId = null) {
        const content = document.getElementById('guide-content');
        
        if (!sectionId) {
            // Show welcome screen
            content.innerHTML = this.getWelcomeContent();
            return;
        }

        content.innerHTML = this.getSectionContent(sectionId);
        this.bindSectionEvents();
    }

    getSectionContent(sectionId) {
        const sections = {
            'getting-started': {
                title: '🚀 Getting Started',
                content: `
                    <h2>Getting Started with D2RBot</h2>
                    
                    <div class="warning-box">
                        <h4><i class="bi bi-exclamation-triangle"></i> Important Disclaimer</h4>
                        <p>Using automation tools may result in account bans. Use at your own risk. This tool is for educational purposes only.</p>
                    </div>

                    <div class="step-indicator">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>System Requirements</h4>
                            <p>Ensure your system meets all requirements</p>
                        </div>
                    </div>

                    <h3>Essential Requirements</h3>
                    <ul>
                        <li><strong>Diablo II: Resurrected</strong> - Latest version</li>
                        <li><strong>Diablo II: Lord of Destruction 1.13c</strong> - CRITICAL: D2RBot will not work without this</li>
                        <li><strong>Windows Operating System</strong> - Windows 10/11 recommended</li>
                    </ul>

                    <h3>Game Settings (Required)</h3>
                    <ul>
                        <li><strong>Resolution:</strong> 1280x720 (required)</li>
                        <li><strong>Display Mode:</strong> Windowed (required)</li>
                        <li><strong>Language:</strong> English (required)</li>
                        <li><strong>Accessibility large fonts:</strong> Disabled</li>
                    </ul>

                    <div class="step-indicator">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Installation</h4>
                            <p>Install D2RBot on your system</p>
                        </div>
                    </div>

                    <ol>
                        <li>Install Diablo II: LOD 1.13c (if not already installed)</li>
                        <li>Download D2RBot from the releases section</li>
                        <li>Extract the zip file to a folder of your choice</li>
                        <li>Run <code>d2rbot.exe</code> to start the application</li>
                    </ol>

                    <div class="tip-box">
                        <h4><i class="bi bi-lightbulb"></i> Pro Tip</h4>
                        <p>Create a dedicated folder for D2RBot (e.g., C:\\D2RBot) to keep everything organized.</p>
                    </div>
                `
            },
            'single-player': {
                title: '👤 Single Player Setup',
                content: `
                    <h2>Single Player Configuration</h2>

                    <div class="step-indicator">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Prerequisites</h4>
                            <p>Prepare your character and game settings</p>
                        </div>
                    </div>

                    <h3>Before You Start</h3>
                    <ul>
                        <li>Create your character in Diablo II: Resurrected</li>
                        <li>Character will be saved to: <code>C:\\Users\\[YourName]\\Saved Games\\Diablo II Resurrected\\mods\\d2rbot\\</code></li>
                        <li>Set game language to English</li>
                    </ul>

                    <div class="step-indicator">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Character Configuration</h4>
                            <p>Set up your character profile in D2RBot</p>
                        </div>
                    </div>

                    <h3>Configuration Steps</h3>
                    <ol>
                        <li>Open D2RBot and click "Add Character"</li>
                        <li><strong>Step 1 - Basic Setup:</strong>
                            <ul>
                                <li>Configuration Name: Choose a name (e.g., "MySorc")</li>
                                <li>Character Class: Select your character's class</li>
                                <li>Character Name: Enter exact character name from game</li>
                            </ul>
                        </li>
                        <li><strong>Step 2 - Authentication:</strong>
                            <ul>
                                <li>Authentication Method: Select "None (Single Player)"</li>
                                <li>Leave username/password empty</li>
                            </ul>
                        </li>
                        <li><strong>Step 3 - Game Settings:</strong>
                            <ul>
                                <li>Game Difficulty: Choose Normal/Nightmare/Hell</li>
                                <li>Max Game Length: Set time limit (recommended: 300-600 seconds)</li>
                            </ul>
                        </li>
                    </ol>

                    <h3>Essential Items in Inventory</h3>
                    <ul>
                        <li><strong>Town Portal Tome</strong> (bind to a hotkey - REQUIRED)</li>
                        <li><strong>Identify Tome</strong></li>
                        <li><strong>Keys</strong> (at least one stack)</li>
                        <li><strong>Horadric Cube</strong> (can be in stash or inventory)</li>
                        <li><strong>Charms</strong> (D2RBot can lock inventory slots to protect them)</li>
                    </ul>

                    <div class="tip-box">
                        <h4><i class="bi bi-lightbulb"></i> Skill Bindings</h4>
                        <p>Make sure your main attack skill is bound to left-click for optimal performance.</p>
                    </div>
                `
            },
            'online-setup': {
                title: '🌐 Online Setup',
                content: `
                    <h2>Battle.net Configuration</h2>

                    <div class="warning-box">
                        <h4><i class="bi bi-shield-exclamation"></i> Account Safety Warning</h4>
                        <p>Use dedicated accounts for botting. Don't bot on main accounts to avoid potential bans.</p>
                    </div>

                    <div class="step-indicator">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Prerequisites</h4>
                            <p>What you need for online play</p>
                        </div>
                    </div>

                    <ul>
                        <li>Valid Battle.net account</li>
                        <li>Character created on Battle.net</li>
                        <li>Authentication credentials</li>
                    </ul>

                    <div class="step-indicator">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Authentication Methods</h4>
                            <p>Choose your preferred login method</p>
                        </div>
                    </div>

                    <h3>Method 1: Username & Password</h3>
                    <ol>
                        <li>Authentication Method: "Username & Password"</li>
                        <li>Username: Your Battle.net username</li>
                        <li>Password: Your Battle.net password</li>
                        <li>Realm: Select your region (EU/US/KR)</li>
                    </ol>

                    <h3>Method 2: Auth Token (Advanced)</h3>
                    <ol>
                        <li>Authentication Method: "Auth Token"</li>
                        <li>Obtain your auth token from Battle.net client</li>
                        <li>Enter token in the Authentication Token field</li>
                        <li>Select realm</li>
                    </ol>

                    <h3>Game Settings</h3>
                    <ul>
                        <li><strong>Create Lobby Games:</strong> Enable for public games</li>
                        <li><strong>Game Name Pattern:</strong> Template for game names (e.g., "farm-")</li>
                        <li><strong>Game Password:</strong> Leave blank for public, set password for private</li>
                    </ul>

                    <div class="tip-box">
                        <h4><i class="bi bi-lightbulb"></i> Best Practices</h4>
                        <p>Use unique game names and vary your patterns to avoid detection. Take regular breaks between sessions.</p>
                    </div>
                `
            },
            'character-setup': {
                title: '⚔️ Character Setup',
                content: `
                    <h2>Character Configuration Guide</h2>

                    <div class="step-indicator">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Dashboard Overview</h4>
                            <p>Understanding the main interface</p>
                        </div>
                    </div>

                    <p>After creating a character, you'll see:</p>
                    <ul>
                        <li>Character cards showing status and stats</li>
                        <li>Control buttons: Start, Stop, Pause</li>
                        <li>Real-time statistics</li>
                        <li>Run progress tracking</li>
                    </ul>

                    <div class="step-indicator">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Configuring Runs</h4>
                            <p>Set up farming locations and automation</p>
                        </div>
                    </div>

                    <ol>
                        <li>Go to character settings</li>
                        <li>Navigate to Step 5 - Runs & Automation</li>
                        <li>Drag and drop runs between Enabled/Disabled lists</li>
                        <li>Configure run-specific settings by clicking on each run</li>
                        <li>Enable "Randomize run order" for variety</li>
                    </ol>

                    <h3>Popular Run Configurations</h3>

                    <h4>Magic Find Setup:</h4>
                    <ul>
                        <li><strong>Mephisto</strong> (fast, good drops)</li>
                        <li><strong>Ancient Tunnels</strong> (no immunities)</li>
                        <li><strong>Pindleskin</strong> (quick runs)</li>
                        <li><strong>Countess</strong> (runes)</li>
                    </ul>

                    <h4>Leveling Setup:</h4>
                    <ul>
                        <li>Enable "leveling" run only</li>
                        <li>Use leveling character classes</li>
                        <li>Start at level 1 for auto-configuration</li>
                    </ul>

                    <h4>Rune Farming:</h4>
                    <ul>
                        <li><strong>Countess</strong> (low-mid runes)</li>
                        <li><strong>Lower Kurast</strong> (high runes)</li>
                        <li><strong>Travincal</strong> (high runes)</li>
                    </ul>

                    <div class="step-indicator">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Health and Safety Settings</h4>
                            <p>Configure survival and emergency settings</p>
                        </div>
                    </div>

                    <h3>Combat & Health Settings</h3>
                    <ul>
                        <li><strong>Healing at (%):</strong> When to use healing potions (recommended: 75%)</li>
                        <li><strong>Mana at (%):</strong> When to use mana potions (recommended: 15%)</li>
                        <li><strong>Chicken at (%):</strong> Emergency exit threshold (recommended: 30%)</li>
                        <li><strong>Mercenary settings:</strong> Configure merc healing</li>
                    </ul>

                    <div class="warning-box">
                        <h4><i class="bi bi-heart"></i> Safety First</h4>
                        <p>Set conservative chicken thresholds to avoid character deaths. It's better to exit early than lose experience!</p>
                    </div>
                `
            },
            'pickit-guide': {
                title: '💎 Pickit System',
                content: `
                    <h2>Item Filtering and Pickup Rules</h2>

                    <p>D2RBot uses <strong>NIP (Notpad Item Pickup)</strong> files to determine which items to pick up during farming runs.</p>

                    <div class="step-indicator">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Understanding Pickit</h4>
                            <p>How the item filtering system works</p>
                        </div>
                    </div>

                    <h3>Basic Syntax</h3>
                    <pre><code>[property] == value && [property2] >= value2 # [stat] >= value3 # comment</code></pre>

                    <h3>Rule Components</h3>
                    <ul>
                        <li><strong>Item Properties:</strong> <code>[name]</code>, <code>[type]</code>, <code>[quality]</code>, <code>[class]</code></li>
                        <li><strong>Conditions:</strong> <code>==</code> (equals), <code>>=</code> (greater/equal), <code><=</code> (less/equal), <code>!=</code> (not equal)</li>
                        <li><strong>Stats:</strong> <code># [stat] >= value</code> (item must have this stat)</li>
                        <li><strong>Comments:</strong> <code>// comment</code> (explanatory text)</li>
                        <li><strong>Max Quantity:</strong> <code># [maxquantity] == X</code> (limit pickup amount)</li>
                    </ul>

                    <div class="step-indicator">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Pickit Management Options</h4>
                            <p>Choose between local or centralized management</p>
                        </div>
                    </div>

                    <h3>Local Pickit (Default)</h3>
                    <ul>
                        <li>Each character has its own pickit folder</li>
                        <li>Located in <code>config/[character_name]/pickit/</code></li>
                        <li>Allows character-specific item filtering</li>
                    </ul>

                    <h3>Centralized Pickit (Optional)</h3>
                    <p><strong>Purpose:</strong> Share the same pickit rules across all characters.</p>

                    <h4>Setup Process:</h4>
                    <ol>
                        <li>Set "Centralized Pickit Path" in D2RBot main settings</li>
                        <li>Enable "Use Centralized Pickit" in each character's settings</li>
                        <li>Place your pickit files in the centralized directory</li>
                    </ol>

                    <h4>Benefits:</h4>
                    <ul>
                        <li>Single management point for all characters</li>
                        <li>Consistent item filtering across characters</li>
                        <li>Easier maintenance and updates</li>
                        <li>Perfect for companion setups</li>
                    </ul>

                    <div class="step-indicator">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Example Rules</h4>
                            <p>Common pickit rule examples</p>
                        </div>
                    </div>

                    <h3>High Runes</h3>
                    <pre><code>// Pick up high runes
[name] == lemrune
[name] == pulrune
[name] == umrune
[name] == malrune
[name] == istrune</code></pre>

                    <h3>Unique Items</h3>
                    <pre><code>// Pick up Stone of Jordan rings
[type] == ring && [quality] == unique # [itemmaxmanapercent] >= 25

// Pick up Shako (Harlequin Crest)
[name] == shako && [quality] == unique && [flag] != ethereal # [defense] >= 141</code></pre>

                    <div class="tip-box">
                        <h4><i class="bi bi-lightbulb"></i> Pro Tips</h4>
                        <ul>
                            <li>Start with simple rules and gradually add complexity</li>
                            <li>Use <code>maxquantity</code> to prevent inventory overflow</li>
                            <li>Test rules with low-value items first</li>
                            <li>Comment your rules for easy maintenance</li>
                        </ul>
                    </div>
                `
            },
            'advanced-features': {
                title: '🔧 Advanced Features',
                content: `
                    <h2>Advanced D2RBot Features</h2>

                    <div class="step-indicator">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Companion Mode</h4>
                            <p>Run multiple characters together</p>
                        </div>
                    </div>

                    <h3>Setting Up Companion Mode</h3>
                    <ol>
                        <li>Enable Companion System in Step 3</li>
                        <li>Set one character as Leader</li>
                        <li>Other characters follow the leader</li>
                        <li>Leader creates games, followers join</li>
                    </ol>

                    <div class="step-indicator">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Scheduler</h4>
                            <p>Automate bot start/stop times</p>
                        </div>
                    </div>

                    <h3>Scheduler Configuration</h3>
                    <ol>
                        <li>Enable Scheduler in Step 3</li>
                        <li>Set time ranges for each day of the week</li>
                        <li>Bot automatically starts/stops during specified times</li>
                        <li>Supports multiple time ranges per day</li>
                    </ol>

                    <div class="step-indicator">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Gambling</h4>
                            <p>Automatically spend excess gold</p>
                        </div>
                    </div>

                    <h3>Gambling Setup</h3>
                    <ol>
                        <li>Enable in Step 6 - Advanced</li>
                        <li>Bot automatically gambles when gold stash is full</li>
                        <li>Configure specific item types to gamble</li>
                    </ol>

                    <div class="step-indicator">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Cube Recipes</h4>
                            <p>Automate Horadric Cube operations</p>
                        </div>
                    </div>

                    <h3>Cube Recipe Automation</h3>
                    <ol>
                        <li>Enable in Step 6 - Advanced</li>
                        <li>Select specific recipes to automate</li>
                        <li>Includes gem upgrading, charm rolling, etc.</li>
                    </ol>

                    <div class="tip-box">
                        <h4><i class="bi bi-lightbulb"></i> Advanced Tips</h4>
                        <ul>
                            <li>Use companion mode for efficient MF runs</li>
                            <li>Schedule bot runs during off-peak hours</li>
                            <li>Gamble for specific items like circlets and amulets</li>
                            <li>Automate gem upgrades to save inventory space</li>
                        </ul>
                    </div>

                    <div class="warning-box">
                        <h4><i class="bi bi-exclamation-triangle"></i> Performance Note</h4>
                        <p>Running multiple advanced features simultaneously may impact performance. Monitor system resources and adjust accordingly.</p>
                    </div>
                `
            },
            'troubleshooting': {
                title: '🔧 Troubleshooting',
                content: `
                    <h2>Common Issues and Solutions</h2>

                    <div class="step-indicator">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Character Issues</h4>
                            <p>Problems with character detection and setup</p>
                        </div>
                    </div>

                    <h3>"Character not found"</h3>
                    <ul>
                        <li>Check character name spelling (case-sensitive)</li>
                        <li>Ensure character exists in correct mode (Single Player vs Online)</li>
                        <li>Verify authentication settings</li>
                        <li>Make sure character is saved properly</li>
                    </ul>

                    <div class="step-indicator">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Game Launch Issues</h4>
                            <p>Problems starting Diablo II: Resurrected</p>
                        </div>
                    </div>

                    <h3>"Game not launching"</h3>
                    <ul>
                        <li>Check D2R path in settings</li>
                        <li>Verify D2 LOD 1.13c installation</li>
                        <li>Run D2RBot as Administrator</li>
                        <li>Ensure game is not already running</li>
                        <li>Check Windows Defender/Antivirus exclusions</li>
                    </ul>

                    <div class="step-indicator">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Bot Behavior Issues</h4>
                            <p>Bot not moving or acting correctly</p>
                        </div>
                    </div>

                    <h3>"Bot not moving/acting"</h3>
                    <ul>
                        <li>Check game resolution (must be 1280x720)</li>
                        <li>Verify windowed mode is enabled</li>
                        <li>Check skill bindings in game</li>
                        <li>Ensure TP tome is bound to hotkey</li>
                        <li>Verify game language is set to English</li>
                        <li>Check if accessibility large fonts are disabled</li>
                    </ul>

                    <div class="step-indicator">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Item Pickup Issues</h4>
                            <p>Problems with item filtering and pickup</p>
                        </div>
                    </div>

                    <h3>"Items not being picked up"</h3>
                    <ul>
                        <li>Check pickit files syntax (proper NIP format)</li>
                        <li>Verify inventory space (bot won't pick up if full)</li>
                        <li>Review pickit rules for accuracy</li>
                        <li>Test with simple rules first</li>
                        <li>Verify file location (correct character's pickit directory)</li>
                        <li>Check if centralized pickit is properly configured</li>
                    </ul>

                    <div class="step-indicator">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h4>Performance Optimization</h4>
                            <p>Improving bot performance and stability</p>
                        </div>
                    </div>

                    <h3>Performance Tips</h3>
                    <ul>
                        <li>Close unnecessary programs</li>
                        <li>Use SSD for better performance</li>
                        <li>Adjust game settings for optimal performance</li>
                        <li>Monitor system resources (CPU, RAM)</li>
                        <li>Disable Windows Game Mode</li>
                        <li>Set D2R process priority to Normal</li>
                    </ul>

                    <div class="warning-box">
                        <h4><i class="bi bi-shield-exclamation"></i> Safety Reminders</h4>
                        <ul>
                            <li>Use dedicated accounts for botting</li>
                            <li>Don't bot on main accounts</li>
                            <li>Take regular breaks between sessions</li>
                            <li>Vary your patterns and timing</li>
                            <li>Monitor for game updates that might break compatibility</li>
                        </ul>
                    </div>

                    <div class="tip-box">
                        <h4><i class="bi bi-lightbulb"></i> Getting Help</h4>
                        <p>If you're still experiencing issues:</p>
                        <ul>
                            <li>Check the logs tab for detailed error messages</li>
                            <li>Review configuration files for syntax errors</li>
                            <li>Try creating a new character configuration</li>
                            <li>Backup and reset settings if necessary</li>
                        </ul>
                    </div>
                `
            }
        };

        const section = sections[sectionId];
        if (!section) return '<p>Section not found.</p>';

        return `
            <div class="section-content active">
                ${section.content}
                <div class="navigation-buttons">
                    <button class="nav-btn" onclick="guideManager.previousSection()">
                        <i class="bi bi-arrow-left"></i> Previous
                    </button>
                    <button class="complete-section-btn" onclick="guideManager.completeSection('${sectionId}')">
                        <i class="bi bi-check-circle"></i> Mark as Complete
                    </button>
                    <button class="nav-btn" onclick="guideManager.nextSection()">
                        Next <i class="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    getWelcomeContent() {
        return `
            <div class="welcome-screen">
                <div class="welcome-icon">📚</div>
                <h2>Welcome to the D2RBot Guide!</h2>
                <p>Select a section from above to begin your journey. Complete each section to track your progress.</p>
                <div class="quick-start">
                    <h3>Quick Start Checklist:</h3>
                    <ul class="checklist">
                        <li><input type="checkbox" id="check-d2r"> <label for="check-d2r">Diablo II: Resurrected installed</label></li>
                        <li><input type="checkbox" id="check-d2lod"> <label for="check-d2lod">Diablo II: LOD 1.13c installed</label></li>
                        <li><input type="checkbox" id="check-resolution"> <label for="check-resolution">Game set to 1280x720 windowed</label></li>
                        <li><input type="checkbox" id="check-english"> <label for="check-english">Game language set to English</label></li>
                    </ul>
                </div>
            </div>
        `;
    }

    bindSectionEvents() {
        // Re-bind checklist events if they exist
        document.querySelectorAll('.checklist input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', this.updateQuickStartProgress.bind(this));
        });
    }

    completeSection(sectionId) {
        if (!this.completedSections.includes(sectionId)) {
            this.completedSections.push(sectionId);
            localStorage.setItem('guide-progress', JSON.stringify(this.completedSections));
            
            // Update UI
            const card = document.querySelector(`[data-section="${sectionId}"]`);
            card.classList.add('completed');
            card.querySelector('.section-status').innerHTML = '<i class="bi bi-check-circle-fill"></i>';
            
            this.updateProgress();
            
            // Show completion message
            this.showCompletionMessage(sectionId);
        }
    }

    showCompletionMessage(sectionId) {
        // Simple completion feedback
        const btn = document.querySelector('.complete-section-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Completed!';
        btn.style.background = '#4CAF50';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }

    updateProgress() {
        const progress = (this.completedSections.length / this.sections.length) * 100;
        document.getElementById('guide-progress').style.width = progress + '%';
        document.getElementById('progress-percent').textContent = Math.round(progress) + '%';
        
        // Update section status indicators
        this.sections.forEach(sectionId => {
            const card = document.querySelector(`[data-section="${sectionId}"]`);
            const status = card.querySelector('.section-status');
            
            if (this.completedSections.includes(sectionId)) {
                card.classList.add('completed');
                status.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
            }
        });
    }

    updateQuickStartProgress() {
        const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
        const checked = document.querySelectorAll('.checklist input[type="checkbox"]:checked');
        
        if (checked.length === checkboxes.length && checkboxes.length > 0) {
            // All items checked - show encouragement
            setTimeout(() => {
                alert('Great! You\'re ready to start using D2RBot. Click on "Getting Started" to begin!');
            }, 500);
        }
    }

    previousSection() {
        if (!this.currentSection) return;
        
        const currentIndex = this.sections.indexOf(this.currentSection);
        if (currentIndex > 0) {
            this.showSection(this.sections[currentIndex - 1]);
        }
    }

    nextSection() {
        if (!this.currentSection) {
            this.showSection(this.sections[0]);
            return;
        }
        
        const currentIndex = this.sections.indexOf(this.currentSection);
        if (currentIndex < this.sections.length - 1) {
            this.showSection(this.sections[currentIndex + 1]);
        }
    }
}

// Initialize guide when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on the guide tab
    if (document.getElementById('guide-tab')) {
        window.guideManager = new GuideManager();
    }
});