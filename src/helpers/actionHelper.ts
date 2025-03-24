import { Page, Locator, expect } from "@playwright/test";
import { logger } from "../utils/logger";
import fs from "fs";
import path from "path";
import {
  CheckOptions,
  ClearOptions,
  ClickOptions,
  DragOptions,
  FillOptions,
  HoverOptions,
  PressOptions,
  SelectOptions,
} from "../types/optionalParameterTypes";

const TIME_OUT = 45000;

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

export async function click(locator: Locator, options?: ClickOptions): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.click(options);
    logger.info(`Clicked element: ${locator}`);
  } catch (error) {
    logger.error(`Failed to click element: ${locator}`, error);
    throw error;
  }
}

export async function doubleClick(locator: Locator, options?: ClickOptions): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.dblclick(options);
    logger.info(`Clicked element: ${locator}`);
  } catch (error) {
    logger.error(`Failed to click element: ${locator}`, error);
    throw error;
  }
}

export async function type(locator: Locator, text: string, options?: FillOptions): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.fill(text, options);
    logger.info(`Typed "${text}" into element: ${locator}`);
  } catch (error) {
    logger.error(`Failed to type into element: ${locator}`, error);
    throw error;
  }
}

export async function clear(locator: Locator, options?: ClearOptions): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.clear(options);
    logger.info(`Cleared input element: ${locator}`);
  } catch (error) {
    logger.error(`Failed to clear input element: ${locator}`, error);
    throw error;
  }
}

export async function press(locator: Locator, key: string, options?: PressOptions): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.press(key, options);
    logger.info(`Pressed key: "${key}" into element: ${locator}`);
  } catch (error) {
    logger.error(`Failed to press key: "${key}" into element: ${locator}`, error);
    throw error;
  }
}

export async function check(locator: Locator, options?: CheckOptions): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.check(options);
    logger.info(`Checked element: ${locator}`);
  } catch (error) {
    logger.error(`Failed to check element:${locator}`, error);
    throw error;
  }
}

export async function uncheck(locator: Locator, options?: CheckOptions): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.uncheck(options);
    logger.info(`Unchecked element: ${locator}`);
  } catch (error) {
    logger.error(`Failed to uncheck element:${locator}`, error);
    throw error;
  }
}

export async function selectByText(
  locator: Locator,
  text: string,
  options?: SelectOptions
): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.selectOption({ label: text }, options);
    logger.info(`Selected option with text: "${text}" from element: ${locator}`);
  } catch (error) {
    logger.error(`Failed to select option with text: "${text}" from element: ${locator}`, error);
    throw error;
  }
}

export async function selectByIndex(
  locator: Locator,
  index: number,
  options?: SelectOptions
): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.selectOption({ index: index }, options);
    logger.info(`Selected option with index: "${index}" from element: ${locator}`);
  } catch (error) {
    logger.error(`Failed to select option with index: "${index}" from element: ${locator}`, error);
    throw error;
  }
}

export async function selectByValue(
  locator: Locator,
  value: string,
  options?: SelectOptions
): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.selectOption({ value: value }, options);
    logger.info(`Selected option with value: "${value}" from element: ${locator}`);
  } catch (error) {
    logger.error(`Failed to select option with value: "${value}" from element: ${locator}`, error);
    throw error;
  }
}

export async function selectByValues(
  locator: Locator,
  value: Array<string>,
  options?: SelectOptions
): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.selectOption(value, options);
    logger.info(`Selected multiple options with values: "${value}" from element: ${locator}`);
  } catch (error) {
    logger.error(
      `Failed to select multiple options with value: "${value}" from element: ${locator}`,
      error
    );
    throw error;
  }
}

export async function hover(locator: Locator, options?: HoverOptions): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.hover(options);
    logger.info(`Hovered over element: ${locator}`);
  } catch (error) {
    logger.error(`Failed to Hovered over element: ${locator}`, error);
    throw error;
  }
}

export async function dragAndDrop(
  dragLocator: Locator,
  destLocator: Locator,
  options?: DragOptions
): Promise<void> {
  try {
    await expect(dragLocator).toBeVisible();
    await expect(destLocator).toBeVisible();
    await dragLocator.dragTo(destLocator, options);
    logger.info(`Dragged element: ${dragLocator} to element: ${destLocator}`);
  } catch (error) {
    logger.error(`Failed to Drag element: ${dragLocator} to element: ${destLocator}`, error);
    throw error;
  }
}

export async function scrollLocatorIntoView(
  locator: Locator,
  timeout: number = TIME_OUT
): Promise<void> {
  try {
    await expect(locator).toBeVisible();
    await locator.scrollIntoViewIfNeeded({ timeout });
    logger.info(`Scrolled element: ${locator} into view`);
  } catch (error) {
    logger.error(`Failed to scroll element: ${locator} into view`, error);
    throw error;
  }
}

export async function downloadFile(
  page: Page,
  downloadLocator: Locator,
  savePath?: string
): Promise<string> {
  try {
    const [download] = await Promise.all([page.waitForEvent("download"), downloadLocator.click()]);
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
