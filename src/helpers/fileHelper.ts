import fs from "fs";
import path from "path";
import { Locator, Page, Download } from "@playwright/test";
import { logger } from "../utils/logger";

const DEFAULT_DOWNLOAD_PATH = path.resolve("test-data/downloadFiles");
const DEFAULT_UPLOAD_PATH = path.resolve("test-data/uploadFiles");

// Ensure directories exist when the module is loaded
ensureDirectoryExists(DEFAULT_DOWNLOAD_PATH);
ensureDirectoryExists(DEFAULT_UPLOAD_PATH);

function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    logger.info(`Directory created: ${dirPath}`);
  }
}

export async function downloadFile(
  page: Page,
  downloadLocator: Locator,
  savePath?: string
): Promise<string> {
  try {
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      downloadLocator.click(),
    ]);
    const finalPath = savePath || path.join(DEFAULT_DOWNLOAD_PATH, download.suggestedFilename());
    await download.saveAs(finalPath);

    if (!fs.existsSync(finalPath)) {
      throw new Error(`Failed to download file to ${finalPath}`);
    }
    logger.info(`File downloaded: ${finalPath}`);
    return finalPath;
  } catch (error) {
    logger.error(`Failed to download file: ${error}`);
    throw error;
  }
}

export async function uploadFile(uploadLocator: Locator, fileName: string): Promise<void> {
  try {
    const finalPath = path.join(DEFAULT_UPLOAD_PATH, fileName);
    if (!fs.existsSync(finalPath)) {
      throw new Error(`File ${fileName} not found at ${finalPath}`);
    }
    await uploadLocator.setInputFiles(finalPath);
    logger.info(`File uploaded: ${finalPath}`);
  } catch (error) {
    logger.error(`Failed to upload file: ${error}`);
    throw error;
  }
}

export async function uploadFileWithChooser(
  page: Page,
  uploadButtonLocator: Locator,
  fileName: string
): Promise<void> {
  try {
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      uploadButtonLocator.click(),
    ]);

    const finalPath = path.join(DEFAULT_UPLOAD_PATH, fileName);
    if (!fs.existsSync(finalPath)) {
      throw new Error(`File ${fileName} not found at ${finalPath}`);
    }

    logger.info(`Uploading file with chooser: ${finalPath}`);
    await fileChooser.setFiles(finalPath);
    logger.info(`File uploaded: ${finalPath}`);
  } catch (error) {
    logger.error(`Failed to upload file with chooser: ${error}`);
    throw error;
  }
}

export function isFileDownloaded(filePath: string): boolean {
  try {
    const exists = fs.existsSync(filePath);
    if (exists) {
      logger.info(`File is downloaded: ${filePath}`);
    } else {
      logger.info(`File not found: ${filePath}`);
    }
    return exists;
  } catch (error) {
    logger.error(`Error checking file existence: ${error}`);
    return false;
  }
}

export async function deleteFile(filePath: string): Promise<void> {
  const absolutePath = path.resolve(filePath);
  try {
    await fs.promises.unlink(absolutePath);
    logger.info(`File deleted: ${absolutePath}`);
  } catch (error) {
    logger.error(`Error deleting file: ${error}`);
  }
}

export async function isFileDeleted(filePath: string): Promise<boolean> {
  const absolutePath = path.resolve(filePath);
  try {
    await fs.promises.access(absolutePath);
    logger.info(`File not deleted, still exists: ${absolutePath}`);
    return false;
  } catch {
    logger.info(`File deleted: ${absolutePath}`);
    return true;
  }
}
