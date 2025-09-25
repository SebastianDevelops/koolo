// Step Navigation System
let currentStep = 1;
const totalSteps = 6;

function showStep(step) {
    // Hide all step panes
    document.querySelectorAll('.step-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Show current step pane
    const currentPane = document.getElementById(`step-${step}`);
    if (currentPane) {
        currentPane.classList.add('active');
    }
    
    // Update step navigation
    document.querySelectorAll('.step-item').forEach((item, index) => {
        item.classList.remove('active', 'completed');
        if (index + 1 === step) {
            item.classList.add('active');
        } else if (index + 1 < step) {
            item.classList.add('completed');
        }
    });
    
    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
    if (nextBtn) nextBtn.style.display = step === totalSteps ? 'none' : 'inline-flex';
    if (submitBtn) submitBtn.style.display = step === totalSteps ? 'inline-flex' : 'none';
}

function changeStep(direction) {
    const newStep = currentStep + direction;
    if (newStep >= 1 && newStep <= totalSteps) {
        currentStep = newStep;
        showStep(currentStep);
    }
}

window.onload = function () {
    // Initialize step navigation
    showStep(1);
    
    // Allow clicking on step navigation
    document.querySelectorAll('.step-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            currentStep = index + 1;
            showStep(currentStep);
        });
    });
    
    // Initialize sortable runs (only if elements exist)
    let enabled_runs_ul = document.getElementById('enabled_runs');
    let disabled_runs_ul = document.getElementById('disabled_runs');
    let searchInput = document.getElementById('search-disabled-runs');

    if (enabled_runs_ul && disabled_runs_ul) {
        new Sortable(enabled_runs_ul, {
            group: 'runs',
            animation: 150,
            onSort: function (evt) {
                updateEnabledRunsHiddenField();
            },
            onAdd: function (evt) {
                updateButtonForEnabledRun(evt.item);
            }
        });

        new Sortable(disabled_runs_ul, {
            group: 'runs',
            animation: 150,
            onAdd: function (evt) {
                updateButtonForDisabledRun(evt.item);
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            filterDisabledRuns(searchInput.value);
        });
    }

    // Add event listeners for add and remove buttons
    document.addEventListener('click', function (e) {
        if (e.target.closest('.remove-run')) {
            e.preventDefault();
            const runElement = e.target.closest('li');
            moveRunToDisabled(runElement);
        } else if (e.target.closest('.add-run')) {
            e.preventDefault();
            const runElement = e.target.closest('li');
            moveRunToEnabled(runElement);
        }
    });

    if (enabled_runs_ul) {
        updateEnabledRunsHiddenField();
    }

    const buildSelectElement = document.querySelector('select[name="characterClass"]');
    if (buildSelectElement) {
        buildSelectElement.addEventListener('change', function() {
            const selectedBuild = buildSelectElement.value;
            const levelingBuilds = ['paladin', 'sorceress_leveling'];

            const enabledRunListElement = document.getElementById('enabled_runs');
            if (!enabledRunListElement) return;

            const enabledRuns = Array.from(enabledRunListElement.querySelectorAll('li')).map(li => li.getAttribute('value'));
            const isLevelingRunEnabled = enabledRuns.includes('leveling');
            const hasOtherRunsEnabled = enabledRuns.length > 1;                  

            if (levelingBuilds.includes(selectedBuild) && (!isLevelingRunEnabled || hasOtherRunsEnabled)) {
                alert("This profile requires enabling the leveling run. Please add only the 'leveling' run to the enabled run list and remove the others.");
            }
        });
    }
}

function updateEnabledRunsHiddenField() {
    // Check if we're using the new card interface
    const cardInterface = document.getElementById('runs-grid');
    if (cardInterface) {
        const enabledRuns = Array.from(document.querySelectorAll('.run-checkbox:checked'))
            .map(checkbox => checkbox.dataset.run);
        const hiddenField = document.getElementById('gameRuns');
        if (hiddenField) {
            hiddenField.value = JSON.stringify(enabledRuns);
        }
        return;
    }
    
    // Fallback to old list interface
    let listItems = document.querySelectorAll('#enabled_runs li');
    let values = Array.from(listItems).map(function (item) {
        return item.getAttribute("value");
    });
    document.getElementById('gameRuns').value = JSON.stringify(values);
}

function filterDisabledRuns(searchTerm) {
    let listItems = document.querySelectorAll('#disabled_runs li');
    searchTerm = searchTerm.toLowerCase();
    listItems.forEach(function (item) {
        let runName = item.getAttribute("value").toLowerCase();
        if (runName.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkLevelingProfile() {
    const levelingProfiles = [
        "sorceress_leveling_hydraorb",
        "sorceress_leveling_lightning",
        "sorceress_leveling",
        "paladin_leveling"
    ];
    const characterClass = document.getElementById('characterClass').value;

    if (levelingProfiles.includes(characterClass)) {
        const confirmation = confirm("This profile requires the leveling run profile, would you like to clear enabled run profiles and select the leveling profile?");
        if (confirmation) {
            clearEnabledRuns();
            selectLevelingProfile();
        }
    }
}

function moveRunToDisabled(runElement) {
    const disabledRunsUl = document.getElementById('disabled_runs');
    updateButtonForDisabledRun(runElement);
    disabledRunsUl.appendChild(runElement);
    updateEnabledRunsHiddenField();
}

function moveRunToEnabled(runElement) {
    const enabledRunsUl = document.getElementById('enabled_runs');
    updateButtonForEnabledRun(runElement);
    enabledRunsUl.appendChild(runElement);
    updateEnabledRunsHiddenField();
}

function updateButtonForEnabledRun(runElement) {
    const button = runElement.querySelector('button');
    button.classList.remove('add-run');
    button.classList.add('remove-run');
    button.title = "Remove run";
    button.innerHTML = '<i class="bi bi-dash"></i>';
}

function updateButtonForDisabledRun(runElement) {
    const button = runElement.querySelector('button');
    button.classList.remove('remove-run');
    button.classList.add('add-run');
    button.title = "Add run";
    button.innerHTML = '<i class="bi bi-plus"></i>';
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize step navigation after DOM is loaded
    if (typeof showStep === 'function') {
        showStep(1);
        initializeRunsInterface();
    }
    
    const schedulerEnabled = document.querySelector('input[name="schedulerEnabled"]');
    const schedulerSettings = document.getElementById('scheduler-settings');
    const characterClassSelect = document.querySelector('select[name="characterClass"]');
    const berserkerBarbOptions = document.querySelector('.berserker-barb-options');
    const novaSorceressOptions = document.querySelector('.nova-sorceress-options');
    const bossStaticThresholdInput = document.getElementById('novaBossStaticThreshold');
    const mosaicAssassinOptions = document.querySelector('.mosaic-assassin-options');
	const runewordSearchInput = document.getElementById('search-runewords');
    const useTeleportCheckbox = document.getElementById('characterUseTeleport');
    const clearPathDistContainer = document.getElementById('clearPathDistContainer');
    const clearPathDistInput = document.getElementById('clearPathDist');
    const clearPathDistValue = document.getElementById('clearPathDistValue');

    if (bossStaticThresholdInput) {
        bossStaticThresholdInput.addEventListener('input', handleBossStaticThresholdChange);
    }

    function toggleSchedulerVisibility() {
        if (schedulerSettings && schedulerEnabled) {
            schedulerSettings.style.display = schedulerEnabled.checked ? 'block' : 'none';
        }
    }

    function updateCharacterOptions() {
        const selectedClass = characterClassSelect.value;
        const noSettingsMessage = document.getElementById('no-settings-message');
        const berserkerBarbOptions = document.querySelector('.berserker-barb-options');
        const novaSorceressOptions = document.querySelector('.nova-sorceress-options');
        const mosaicAssassinOptions = document.querySelector('.mosaic-assassin-options');
        // Hide all options first
        berserkerBarbOptions.style.display = 'none';
        novaSorceressOptions.style.display = 'none';
        mosaicAssassinOptions.style.display = 'none';
        noSettingsMessage.style.display = 'none';
        
        // Show relevant options based on class
        if (selectedClass === 'berserker') {
            berserkerBarbOptions.style.display = 'block';
        } else if (selectedClass === 'nova' || selectedClass === 'lightsorc') {
            novaSorceressOptions.style.display = 'block';
            updateNovaSorceressOptions();
        } else if (selectedClass === 'mosaic') {
            mosaicAssassinOptions.style.display = 'block';
        } else {
            noSettingsMessage.style.display = 'block';
        }
    }
    function toggleClearPathVisibility() {
        if (useTeleportCheckbox && clearPathDistContainer) {
            if (useTeleportCheckbox.checked) {
                clearPathDistContainer.style.display = 'none';
            } else {
                clearPathDistContainer.style.display = 'block';
            }
        }
    }

    // Update the displayed value when the slider changes
    function updateClearPathValue() {
        if (clearPathDistInput && clearPathDistValue) {
            clearPathDistValue.textContent = clearPathDistInput.value;
        }
    }

    // Set up event listeners
    if (useTeleportCheckbox) {
        useTeleportCheckbox.addEventListener('change', toggleClearPathVisibility);
        // Initialize visibility
        toggleClearPathVisibility();
    }

    if (clearPathDistInput) {
        clearPathDistInput.addEventListener('input', updateClearPathValue);
        // Initialize value display
        updateClearPathValue();
    }
    
    function updateNovaSorceressOptions() {
        const selectedDifficulty = document.getElementById('gameDifficulty').value;
        updateBossStaticThresholdMin(selectedDifficulty);
        handleBossStaticThresholdChange();
    }
    
    function updateBossStaticThresholdMin(difficulty) {
        const input = document.getElementById('novaBossStaticThreshold');
        let minValue;
        switch(difficulty) {
            case 'normal':
                minValue = 1;
                break;
            case 'nightmare':
                minValue = 33;
                break;
            case 'hell':
                minValue = 50;
                break;
            default:
                minValue = 65;
        }
        input.min = minValue;

        // Ensure the current value is not less than the new minimum
        if (parseInt(input.value) < minValue) {
            input.value = minValue;
        }
    }

    characterClassSelect.addEventListener('change', updateCharacterOptions);
    document.getElementById('gameDifficulty').addEventListener('change', function() {
        if (characterClassSelect.value === 'nova' || characterClassSelect.value === 'lightsorc') {
            updateNovaSorceressOptions();
        }
    });

    characterClassSelect.addEventListener('change', updateCharacterOptions);
    updateCharacterOptions(); // Call this initially to set the correct state

    // Set initial state
    if (schedulerEnabled) {
        toggleSchedulerVisibility();
        schedulerEnabled.addEventListener('change', toggleSchedulerVisibility);
    }
    
    if (characterClassSelect && (characterClassSelect.value === 'nova' || characterClassSelect.value === 'lightsorc')) {
        updateNovaSorceressOptions();
    }

    document.querySelectorAll('.add-time-range').forEach(button => {
        button.addEventListener('click', function () {
            const day = this.dataset.day;
            const timeRangesDiv = this.previousElementSibling;
            if (timeRangesDiv) {
                const newTimeRange = document.createElement('div');
                newTimeRange.className = 'time-range';
                newTimeRange.innerHTML = `
                    <input type="time" name="scheduler[${day}][start][]" required>
                    <span>to</span>
                    <input type="time" name="scheduler[${day}][end][]" required>
                    <button type="button" class="remove-time-range"><i class="bi bi-trash"></i></button>
                `;
                timeRangesDiv.appendChild(newTimeRange);
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target.closest('.remove-time-range')) {
            e.target.closest('.time-range').remove();
        }
    });

    document.getElementById('tzTrackAll').addEventListener('change', function (e) {
        document.querySelectorAll('.tzTrackCheckbox').forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    });
	
	 function filterRunewords(searchTerm = '') { // Default parameter to ensure previously checked runewords show before searching
        let listItems = document.querySelectorAll('.runeword-item');
        searchTerm = searchTerm.toLowerCase();

        listItems.forEach(function (item) {
            const isChecked = item.querySelector('input[type="checkbox"]').checked;
            const rwName = item.querySelector('.runeword-name').textContent.toLowerCase();

            if (isChecked || (searchTerm && rwName.includes(searchTerm))) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (runewordSearchInput) {
        runewordSearchInput.addEventListener('input', function () {
            filterRunewords(runewordSearchInput.value);
        });

        document.addEventListener('change', function(e) {
            if (e.target.matches('.runeword-item input[type="checkbox"]')) {
                filterRunewords(runewordSearchInput.value);
            }
        });

        filterRunewords();
    }

    // Initialize runs interface if on step 5
    initializeRunsInterface();
});

// Enhanced runs selection functionality
function initializeRunsInterface() {
    const runsGrid = document.getElementById('runs-grid');
    const searchInput = document.getElementById('runs-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const enabledCount = document.querySelector('.enabled-count');
    
    if (!runsGrid) return;
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('.run-card').forEach(card => {
                const runName = card.querySelector('h6').textContent.toLowerCase();
                const runDesc = card.querySelector('p').textContent.toLowerCase();
                const matches = runName.includes(searchTerm) || runDesc.includes(searchTerm);
                card.style.display = matches ? 'flex' : 'none';
            });
        });
    }
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            document.querySelectorAll('.run-card').forEach(card => {
                const category = card.dataset.category;
                const isEnabled = card.classList.contains('enabled');
                
                let show = false;
                if (filter === 'all') show = true;
                else if (filter === 'enabled') show = isEnabled;
                else show = category === filter;
                
                card.style.display = show ? 'flex' : 'none';
            });
        });
    });
    
    // Run card click functionality
    document.querySelectorAll('.run-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('run-info-icon')) return;
            
            const checkbox = this.querySelector('.run-checkbox');
            checkbox.checked = !checkbox.checked;
            this.classList.toggle('enabled', checkbox.checked);
            updateEnabledCount();
            updateHiddenField();
        });
    });
    
    // Action buttons
    const selectAllBtn = document.getElementById('select-all-runs');
    const clearAllBtn = document.getElementById('clear-all-runs');
    
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', function() {
            document.querySelectorAll('.run-checkbox').forEach(checkbox => {
                checkbox.checked = true;
                checkbox.closest('.run-card').classList.add('enabled');
            });
            updateEnabledCount();
            updateHiddenField();
        });
    }
    
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            document.querySelectorAll('.run-checkbox').forEach(checkbox => {
                checkbox.checked = false;
                checkbox.closest('.run-card').classList.remove('enabled');
            });
            updateEnabledCount();
            updateHiddenField();
        });
    }
    
    function updateEnabledCount() {
        const count = document.querySelectorAll('.run-checkbox:checked').length;
        if (enabledCount) {
            enabledCount.textContent = `${count} run${count !== 1 ? 's' : ''} selected`;
        }
    }
    
    function updateHiddenField() {
        const enabledRuns = Array.from(document.querySelectorAll('.run-checkbox:checked'))
            .map(checkbox => checkbox.dataset.run);
        const hiddenField = document.getElementById('gameRuns');
        if (hiddenField) {
            hiddenField.value = JSON.stringify(enabledRuns);
        }
    }
    
    // Initialize counts and hidden field
    updateEnabledCount();
    updateHiddenField();
}

function handleBossStaticThresholdChange() {
    const input = document.getElementById('novaBossStaticThreshold');
    const selectedDifficulty = document.getElementById('gameDifficulty').value;
    let minValue;
    switch(selectedDifficulty) {
        case 'normal':
            minValue = 1;
            break;
        case 'nightmare':
            minValue = 33;
            break;
        case 'hell':
            minValue = 50;
            break;
        default:
            minValue = 65;
    }

    let value = parseInt(input.value);
    if (isNaN(value) || value < minValue) {
        value = minValue;
    } else if (value > 100) {
        value = 100;
    }
    input.value = value;
}