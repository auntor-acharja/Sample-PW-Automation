import fs from "fs";
import path from "path";
import { Locator, Page } from "@playwright/test";
import { logger } from "../utils/logger";

export class FileHelper {
  private page: Page;
  private defaultDownloadPath: string;
  private defaultUploadPath: string;

  constructor(page: Page) {
    this.page = page;
    this.defaultDownloadPath = path.resolve("test-data/downloadFiles");
    this.defaultUploadPath = path.resolve("test-data/uploadFiles");
    this.ensureDirectoryExists(this.defaultDownloadPath);
    this.ensureDirectoryExists(this.defaultUploadPath);
  }

  private ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      logger.info(`Directory created: ${dirPath}`);
    }
  }

  async downloadFile(downloadLocator: Locator, savePath?: string): Promise<string> {
    try {
      const [download] = await Promise.all([
        this.page.waitForEvent("download"),
        downloadLocator.click(),
      ]);
      const finalPath =
        savePath || path.join(this.defaultDownloadPath, download.suggestedFilename());
      await download.saveAs(finalPath);

      if (!fs.existsSync(finalPath)) {
        throw new Error(`Failed to download file to ${finalPath}`);
      }
      logger.info(`File downloaded: ${finalPath}`);
      return finalPath;
    } catch (error) {
      logger.error(`Failed to download file: ${error.message}`);
      throw error;
    }
  }

  async uploadFile(uploadLocator: Locator, fileName: string): Promise<void> {
    try {
      const finalPath = path.join(this.defaultUploadPath, fileName);
      if (!fs.existsSync(finalPath)) {
        throw new Error(`File ${fileName} not found at ${finalPath}`);
      }
      await uploadLocator.setInputFiles(finalPath);
      logger.info(`File uploaded: ${finalPath}`);
    } catch (error) {
      logger.error(`Failed to upload file: ${error.message}`);
      throw error;
    }
  }

  async uploadFileWithChooser(uploadButtonLocator: Locator, fileName: string): Promise<void> {
    try {
      const [fileChooser] = await Promise.all([
        this.page.waitForEvent("filechooser"),
        uploadButtonLocator.click(),
      ]);

      const finalPath = path.join(this.defaultUploadPath, fileName);
      if (!fs.existsSync(finalPath)) {
        throw new Error(`File ${fileName} not found at ${finalPath}`);
      }

      logger.info(`Uploading file with chooser: ${finalPath}`);
      await fileChooser.setFiles(finalPath);
      logger.info(`File uploaded: ${finalPath}`);
    } catch (error) {
      logger.error(`Failed to upload file with chooser: ${error.message}`);
      throw error;
    }
  }

  async isFileDownloaded(filePath: string): Promise<boolean> {
    try {
      const exists = fs.existsSync(filePath);
      if (exists) {
        logger.info(`File is downloaded: ${filePath}`);
      } else {
        logger.info(`File not found: ${filePath}`);
      }
      return exists;
    } catch (error) {
      logger.error(`Error checking file existence: ${error.message}`);
      return false;
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    const absolutePath = path.resolve(filePath);
    try {
      await fs.promises.unlink(absolutePath);
      logger.info(`File deleted: ${absolutePath}`);
    } catch (error) {
      logger.error(`Error deleting file: ${error.message}`);
    }
  }

  async isFileDeleted(filePath: string): Promise<boolean> {
    const absolutePath = path.resolve(filePath);
    try {
      await fs.promises.access(absolutePath);
      logger.info(`File not deleted, still exists: ${absolutePath}`);
      return false;
    } catch {
      logger.log(`File deleted: ${absolutePath}`);
      return true;
    }
  }
}
