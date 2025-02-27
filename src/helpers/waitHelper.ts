import { Page, Locator, Response, Request } from "@playwright/test";
import { logger } from "../utils/logger";

const TIME_OUT = 15000;

export async function waitForSelector(
  page: Page,
  selector: string,
  timeout = TIME_OUT
): Promise<void> {
  try {
    logger.info(`Waiting for selector: ${selector}`);
    await page.waitForSelector(selector, { timeout });
    logger.info(`Selector appeared: ${selector}`);
  } catch (error) {
    logger.error(`Error waiting for selector: ${selector} - ${error}`);
    throw error;
  }
}

export async function waitForEvent(
  page: Page,
  eventName: string,
  timeout: number = TIME_OUT
): Promise<void> {
  try {
    logger.info(`Waiting for event: ${eventName}`);
    await page.waitForEvent(eventName as any, { timeout });
    logger.info(`Event received: ${eventName}`);
  } catch (error) {
    logger.error(`Error waiting for event: ${eventName} - ${error}`);
    throw error;
  }
}

export async function waitForFunction(
  page: Page,
  fn: () => boolean | Promise<boolean>
): Promise<void> {
  try {
    logger.info("Waiting for function condition...");
    await page.waitForFunction(fn);
    logger.info("Function condition met.");
  } catch (error) {
    logger.error(`Error waiting for function - ${error}`);
    throw error;
  }
}

export async function waitForLoadState(
  page: Page,
  state: "load" | "domcontentloaded" | "networkidle",
  timeout: number = TIME_OUT
): Promise<void> {
  try {
    logger.info(`Waiting for load state: ${state}`);
    await page.waitForLoadState(state, { timeout });
    logger.info(`Load state achieved: ${state}`);
  } catch (error) {
    logger.error(`Error waiting for load state: ${state} - ${error}`);
    throw error;
  }
}

export async function waitForRequest(
  page: Page,
  partialUrl: string,
  timeout: number = TIME_OUT
): Promise<Request> {
  try {
    logger.info(`Waiting for request containing: ${partialUrl}`);
    
    const request = await page.waitForRequest(request => 
      request.url().includes(partialUrl), 
      { timeout }
    );

    logger.info(`Request received: ${request.url()}`);
    return request;
  } catch (error) {
    logger.error(`Error waiting for request containing: ${partialUrl} - ${error}`);
    throw error;
  }
}

export async function waitForResponse(
  page: Page,
  partialUrl: string,
  timeout: number = TIME_OUT
): Promise<Response> {
  try {
    logger.info(`Waiting for response containing: ${partialUrl}`);
    
    const response = await page.waitForResponse(response => 
      response.url().includes(partialUrl), 
      { timeout }
    );

    logger.info(`Response received: ${response.url()}`);
    return response;
  } catch (error) {
    logger.error(`Error waiting for response containing: ${partialUrl} - ${error}`);
    throw error;
  }
}

export async function waitForURL(
  page: Page,
  partialUrl: string,
  timeout: number = TIME_OUT
): Promise<void> {
  try {
    logger.info(`Waiting for URL containing: ${partialUrl}`);
    await page.waitForURL(url => url.toString().includes(partialUrl), { timeout });
    logger.info(`URL loaded containing: ${partialUrl}`);
  } catch (error) {
    logger.error(`Error waiting for URL containing: ${partialUrl} - ${error}`);
    throw error;
  }
}


export async function waitForLocator(
  locator: Locator,
  state: "attached" | "visible" | "hidden" | "detached",
  timeout = TIME_OUT
): Promise<void> {
  try {
    logger.info(`Waiting for locator state: ${state}`);
    await locator.waitFor({ state, timeout });
    logger.info(`Locator state achieved: ${state}`);
  } catch (error) {
    logger.error(`Error waiting for locator state: ${state} - ${error}`);
    throw error;
  }
}
