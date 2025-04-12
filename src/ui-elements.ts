import { App, Editor, MarkdownView, Modal, Notice, Plugin } from 'obsidian';
import { PluginWithSettings } from './setting-tab';

/**
 * Modal for displaying sample content
 */
export class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

/**
 * Registers the ribbon icon in the left sidebar
 */
export function registerRibbonIcon(plugin: Plugin): void {
	// This creates an icon in the left ribbon.
	const ribbonIconEl = plugin.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
		// Called when the user clicks the icon.
		new Notice('This is a notice!');
	});
	// Perform additional things with the ribbon
	ribbonIconEl.addClass('my-plugin-ribbon-class');
}

/**
 * Registers the status bar item at the bottom of the app
 */
export function registerStatusBar(plugin: Plugin): void {
	// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
	const statusBarItemEl = plugin.addStatusBarItem();
	statusBarItemEl.setText('Status Bar Text');
}

/**
 * Registers all commands for the plugin
 */
export function registerCommands(plugin: PluginWithSettings): void {
	// This adds a simple command that can be triggered anywhere
	plugin.addCommand({
		id: 'open-sample-modal-simple',
		name: 'Open sample modal (simple)',
		callback: () => {
			new SampleModal(plugin.app).open();
		}
	});
	
	// This adds an editor command that can perform some operation on the current editor instance
	plugin.addCommand({
		id: 'sample-editor-command',
		name: 'Sample editor command',
		editorCallback: (editor: Editor, view: MarkdownView) => {
			console.log(editor.getSelection());
			editor.replaceSelection('Sample Editor Command');
		}
	});
	
	// This adds a complex command that can check whether the current state of the app allows execution of the command
	plugin.addCommand({
		id: 'open-sample-modal-complex',
		name: 'Open sample modal (complex)',
		checkCallback: (checking: boolean) => {
			// Conditions to check
			const markdownView = plugin.app.workspace.getActiveViewOfType(MarkdownView);
			if (markdownView) {
				// If checking is true, we're simply "checking" if the command can be run.
				// If checking is false, then we want to actually perform the operation.
				if (!checking) {
					new SampleModal(plugin.app).open();
				}

				// This command will only show up in Command Palette when the check function returns true
				return true;
			}
		}
	});
}

/**
 * Registers DOM events and intervals
 */
export function registerEvents(plugin: Plugin): void {
	// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
	// Using this function will automatically remove the event listener when this plugin is disabled.
	plugin.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		console.log('click', evt);
	});

	// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
	plugin.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
}
