import fs from "fs";
import path from "path";
import { Page } from "@playwright/test";
import {logger} from "./logger";

export function loadJson(filePath: string): any | null {
  try {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`JSON file not found at ${absolutePath}`);
    }
    const fileContent = fs.readFileSync(absolutePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    logger.error(`Error loading JSON file: ${error}`);
    return null;
  }
}

export async function captureScreenshot(page: Page, screenshotPath: string): Promise<void> {
  try {
    const dir = path.dirname(screenshotPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await page.screenshot({ path: screenshotPath, fullPage: true });
    logger.info(`Screenshot saved at: ${screenshotPath}`);
  } catch (error) {
    logger.error("Error capturing screenshot:", error);
  }
}

