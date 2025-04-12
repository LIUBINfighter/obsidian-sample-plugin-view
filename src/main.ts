import { Plugin, WorkspaceLeaf } from 'obsidian';
import { MyPluginSettings, DEFAULT_SETTINGS, SampleSettingTab } from './sample-setting-tab';
// Import the custom view
import { CustomView, CUSTOM_VIEW_TYPE } from './custom-item-view';

// Comment out the sample UI elements import
// import { registerRibbonIcon, registerStatusBar, registerCommands, registerEvents } from './sample-ui-elements';

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	async onload() {
		await this.loadSettings();

		// Comment out the sample UI elements registration
		// registerRibbonIcon(this);
		// registerStatusBar(this);
		// registerCommands(this);
		// registerEvents(this);

		// Register the custom view
		this.registerView(
			CUSTOM_VIEW_TYPE,
			(leaf: WorkspaceLeaf) => new CustomView(leaf)
		);

		// Add a ribbon icon to open the custom view
		this.addRibbonIcon('dice', 'Open Custom View', () => {
			this.activateView();
		});

		// Add a command to open the custom view
		this.addCommand({
			id: 'open-custom-view',
			name: 'Open Custom View',
			callback: () => {
				this.activateView();
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {
		// Deregister the custom view
		this.app.workspace.detachLeavesOfType(CUSTOM_VIEW_TYPE);
	}

	async activateView() {
		// Check if the view is already open
		const { workspace } = this.app;
		let leaf = workspace.getLeavesOfType(CUSTOM_VIEW_TYPE)[0];

		// If the view is not open, create a new leaf in the right sidebar
		if (!leaf) {
			const newLeaf = workspace.getRightLeaf(false);
			if (newLeaf) {
				leaf = newLeaf;
				await leaf.setViewState({
					type: CUSTOM_VIEW_TYPE,
					active: true,
				});
			}
		}

		// Reveal the leaf in the right sidebar if it exists
		if (leaf) {
			workspace.revealLeaf(leaf);
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

