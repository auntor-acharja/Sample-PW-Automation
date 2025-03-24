import fs from "fs";
import path from "path";
import { logger } from "./logger";

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
