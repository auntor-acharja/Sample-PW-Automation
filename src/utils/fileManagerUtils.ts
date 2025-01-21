import { Page } from 'playwright';
import fs from 'fs';
import path from 'path';
import { Locator } from '@playwright/test';

export class FileManagerUtils {
    private page: Page;
    private defaultDownloadPath: string;
    private defaultUploadPath: string;

    constructor(page: Page) {
        this.page = page;
        this.defaultDownloadPath = path.resolve(process.cwd(), 'test-data/downloads');
        this.defaultUploadPath = path.resolve(process.cwd(), 'test-data/uploads');

        this.ensureDirectoryExists(this.defaultDownloadPath);
        this.ensureDirectoryExists(this.defaultUploadPath);
    }

    private ensureDirectoryExists(dirPath: string): void {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    async downloadFile(downloadLocator: Locator, savePath?: string): Promise<string> {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            downloadLocator.click(),
        ]);

        const finalPath = savePath || path.join(this.defaultDownloadPath, download.suggestedFilename());
        await download.saveAs(finalPath);
        return finalPath;
    }

    async uploadFile(uploadLocator: Locator, fileName: string): Promise<void> {
        const finalPath = path.join(this.defaultUploadPath, fileName);
        if (uploadLocator) {
            await uploadLocator.setInputFiles(finalPath);
        } else {
            console.log('Upload selector not found.');
        }
    }

    async uploadFileWithChooser(uploadButtonLocator: Locator, fileName: string): Promise<void> {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            uploadButtonLocator.click(),
        ]);

        const finalPath = path.join(this.defaultUploadPath, fileName);
        await fileChooser.setFiles(finalPath);
    }

    async isFileDownloaded(filePath: string): Promise<boolean> {
        const exists = fs.existsSync(filePath);
        return exists;
    }

    async deleteFile(filePath: string): Promise<void> {
        const absolutePath = path.resolve(filePath);
        try {
            await fs.promises.unlink(absolutePath);
        } catch (error) {
            console.log(`Error deleting file: ${error.message}`);
        }
    }

    async isFileDeleted(filePath: string): Promise<boolean> {
        const absolutePath = path.resolve(filePath);
        try {
            await fs.promises.access(absolutePath);
            return false;
        } catch {
            console.log(`File ${absolutePath} does not exist, confirmed deleted.`);
            return true;
        }
    }
}