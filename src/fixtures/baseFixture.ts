import { test as base, expect } from "@playwright/test";
import { PageManager } from "../pages/pageManager";
import { environment } from "../utils/environmentUtils";
import { logger } from "../utils/logger";
import { ProductPage } from "../pages/productPage";
import { LoginPage } from "../pages/loginPage";
import { Menu } from "../pages/components/menu";
import { captureScreenshot } from "../utils/commonUtils";

type FixtureType = {
  pageManager: PageManager;
  productPage: ProductPage;
  loginPage: LoginPage;
  menu: Menu;
  login: void;
  network: void;
  saveScreenshot: (path: string) => Promise<void>;
};

export const test = base.extend<FixtureType>({
  pageManager: async ({ page, context }, use) => {
    await use(new PageManager(page, context));
  },
  productPage: async ({ pageManager }, use) => { // That's a way we can get the pages from pageManager and pass as fixture
    await use(pageManager.getProductPage());
  },
  loginPage: async ({ page }, use) => {  // That's a way we can create pageObject and pass as fixture directly, In this case we don't need any pageManager class
    await use(new LoginPage(page));
  },
  menu: async ({ pageManager }, use) => {
    await use(pageManager.getMenu());
  },
  login: async ({ pageManager }, use) => {
    try {
      await pageManager.getPage().goto(environment.url);
      await pageManager
        .getLoginPage()
        .loginToApplication(environment.credentials.username, environment.credentials.password);
        console.log(`This Console Log just for Github action Environemnt variable testing ${environment.credentials.username}::::: ${environment.credentials.password}`)
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
