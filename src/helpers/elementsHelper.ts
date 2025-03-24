import { Page, Locator } from "@playwright/test";
import { logger } from "../utils/logger";
import { waitForVisible } from "./waitHelper";

const TIME_OUT = 45000;

export async function getText(locator: Locator): Promise<string> {
  try {
    await waitForVisible(locator);
    const text = (await locator.textContent()) || "";
    logger.info(`Text extracted: "${text.trim()}"`);
    return text.trim();
  } catch (error) {
    logger.error(`Failed to get text from element: ${locator}`, error);
    throw error;
  }
}

export async function getAllTexts(locator: Locator): Promise<Array<string>> {
  try {
    await waitForVisible(locator);
    const text = await locator.allInnerTexts();
    logger.info(`All Inner text: "${text}"`);
    return text;
  } catch (error) {
    logger.error(`Failed to get all inner text from element: ${locator}`, error);
    throw error;
  }
}

export async function getInnerText(locator: Locator): Promise<string> {
  try {
    await waitForVisible(locator);
    const text = await locator.innerText();
    logger.info(`Inner text: "${text}"`);
    return text;
  } catch (error) {
    logger.error(`Failed to get inner text from element: ${locator}`, error);
    throw error;
  }
}

export async function getInputValue(locator: Locator): Promise<string> {
  try {
    await waitForVisible(locator);
    const value = await locator.inputValue();
    logger.info(`Input value: "${value}"`);
    return value;
  } catch (error) {
    logger.error(`Failed to get input value from element: ${locator}`, error);
    throw error;
  }
}

export async function getAttribute(
  locator: Locator,
  attributeName: string,
  timeout: number = TIME_OUT
): Promise<null | string> {
  return await locator.getAttribute(attributeName, { timeout });
}

export async function isElementVisible(
  locator: Locator,
  timeout: number = TIME_OUT
): Promise<boolean> {
  try {
    const isVisible = await locator.isVisible({ timeout: timeout });
    logger.info(`Element: ${locator} is ${isVisible ? "visible" : "not visible"}`);
    return isVisible;
  } catch (error) {
    logger.error(`Failed to check visibility of element: ${locator}`, error);
    throw error;
  }
}

export async function isElementHidden(
  locator: Locator,
  timeout: number = TIME_OUT
): Promise<boolean> {
  try {
    await locator.waitFor({ state: "hidden", timeout });
    const isHidden = await locator.isHidden();
    logger.info(`Element: ${locator} is ${isHidden ? "hidden" : "not hidden"}`);
    return isHidden;
  } catch (error) {
    logger.error(`Failed to check if element is hidden: ${locator}`, error);
    throw error;
  }
}

export async function isElementDisabled(locator: Locator): Promise<boolean> {
  try {
    const isDisabled = await locator.isDisabled();
    logger.info(`Element: ${locator} is ${isDisabled ? "disabled" : "not disabled"}`);
    return isDisabled;
  } catch (error) {
    logger.error(`Failed to check if element is disabled: ${locator}`, error);
    throw error;
  }
}

export async function isElementEnabled(locator: Locator): Promise<boolean> {
  try {
    const isEnabled = await locator.isEnabled();
    logger.info(`Element: ${locator} is ${isEnabled ? "enabled" : "not enabled"}`);
    return isEnabled;
  } catch (error) {
    logger.error(`Failed to check if element is enabled: ${locator}`, error);
    throw error;
  }
}

export async function isElementChecked(locator: Locator): Promise<boolean> {
  try {
    const isChecked = await locator.isChecked();
    logger.info(`Element: ${locator} is ${isChecked ? "checked" : "not checked"}`);
    return isChecked;
  } catch (error) {
    logger.error(`Failed to check if element is checked: ${locator}`, error);
    throw error;
  }
}
