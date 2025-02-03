import { Page } from "@playwright/test";
import { logger } from "../utils/logger";

export async function initializeClipboardPermissions(page: Page): Promise<void> {
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  logger.info("Clipboard permissions initialized.");
}

export async function copyTextToClipboard(page: Page, text: string): Promise<void> {
  try {
    await page.evaluate((clipboardText) => {
      navigator.clipboard.writeText(clipboardText);
    }, text);
    logger.info(`Text copied to clipboard: "${text}"`);
  } catch (error) {
    logger.error(`Error copying text '${text}' to clipboard: ${error}`);
    throw error;
  }
}

export async function getTextFromClipboard(page: Page): Promise<string> {
  try {
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    logger.info(`Text retrieved from clipboard: "${clipboardText}"`);
    return clipboardText;
  } catch (error) {
    logger.error(`Error retrieving text from clipboard: ${error}`);
    throw error;
  }
}

export async function clearClipboard(page: Page): Promise<void> {
  try {
    await page.evaluate(() => navigator.clipboard.writeText(""));
    logger.info("Clipboard cleared.");
  } catch (error) {
    logger.error(`Error clearing clipboard: ${error}`);
    throw error;
  }
}
