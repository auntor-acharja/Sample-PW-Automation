import { Page } from "@playwright/test"

export class ClipboardUtils {

    constructor(readonly page: Page) {
        this.page = page;
    }

    async initializePermissions(): Promise<void> {
        await this.page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
        console.log("Clipboard permissions initialized.");
    }

    async copyTextToClipboard(text: string): Promise<void> {
        try {
            await this.page.evaluate((clipboardText) => {
                navigator.clipboard.writeText(clipboardText);
            }, text);
        } catch (error) {
            console.log(`Error copying text '${text}' to clipboard: ${error}`);
            throw error;
        }
    }

    async getTextFromClipboard(): Promise<string> {
        try {
            const clipboardText = await this.page.evaluate(() => {
                return navigator.clipboard.readText();
            });
            return clipboardText;
        } catch (error) {
            console.log(`Error retrieving text from clipboard: ${error}`);
            throw error;
        }
    }

    async clearClipboard(): Promise<void> {
        try {
            await this.page.evaluate(() => {
                navigator.clipboard.writeText('');
            });
        } catch (error) {
            console.log(`Error clearing clipboard: ${error}`);
            throw error;
        }
    }
}
