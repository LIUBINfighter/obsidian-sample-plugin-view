import { ItemView, WorkspaceLeaf, Notice } from 'obsidian';

export const CUSTOM_VIEW_TYPE = 'custom-view';

export class CustomView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType(): string {
		return CUSTOM_VIEW_TYPE;
	}

	getDisplayText(): string {
		return 'Custom View';
	}

	getIcon(): string {
		return 'dice';
	}

	async onOpen(): Promise<void> {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl('h4', { text: 'Custom View' });
		container.createEl('p', { text: 'This is a custom view created with ItemView.' });

		// Add a button as an example
		const buttonEl = container.createEl('button', { text: 'Click me!' });
		buttonEl.addEventListener('click', () => {
			// Show a notification when the button is clicked
			new Notice('Button clicked in Custom View!');
		});
	}

	async onClose(): Promise<void> {
		// Nothing to clean up
	}
}
