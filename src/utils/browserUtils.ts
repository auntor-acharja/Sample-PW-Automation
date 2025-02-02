import { Browser } from "@playwright/test";

export class BrowserUtils {
  static async isChrome(browser: Browser): Promise<boolean> {
    const browserType = browser.browserType();
    const isChrome = browserType.name() === "chromium";
    return isChrome;
  }

  static async isFirefox(browser: Browser): Promise<boolean> {
    const browserType = browser.browserType();
    const isFirefox = browserType.name() === "firefox";
    return isFirefox;
  }

  static async isWebkit(browser: Browser): Promise<boolean> {
    const browserType = browser.browserType();
    const isWebkit = browserType.name() === "webkit";
    return isWebkit;
  }
}
