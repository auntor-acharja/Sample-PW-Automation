import { test as base, expect } from "@playwright/test";
import { environment } from "../config/config";
import { logger } from "../utils/logger";
import { LoginPage } from "../pages/loginPage";
import { Menu } from "../pages/components/menu";
import { captureScreenshot } from "../utils/commonUtils";

type FixtureType = {
  loginPage: LoginPage;
  menu: Menu;
  login: void;
  network: void;
  saveScreenshot: (path: string) => Promise<void>;
};

export const test = base.extend<FixtureType>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  menu: async ({ page }, use) => {
    await use(new Menu(page));
  },
  login: async ({ loginPage, page }, use) => {
    try {
      await page.goto(environment.url);
      await loginPage.loginToApplication(
        environment.credentials.username,
        environment.credentials.password
      );
    } catch (error) {
      logger.error("Initial login process failed:", error);
      throw error;
    }

    await use();
  },
  network: async ({ page }, use) => {
    page.on("response", (response) => {
      logger.info(`Response URL: ${response.url()} - Status: ${response.status()}`);
      expect.soft(response.status(), `Failed for URL: ${response.url()}`).toBeLessThan(404);
    });

    await use();
  },
  saveScreenshot: async ({ page }, use) => {
    const capture = async (path: string) => {
      logger.info(`Capturing screenshot: ${path}`);
      await captureScreenshot(page, path);
    };
    await use(capture);
  },
});

export { expect } from "@playwright/test";
