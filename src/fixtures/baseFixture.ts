import { test as base, expect, Page } from "@playwright/test";
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
  menu:Menu;
  login: void;
  network:void;
  saveScreenshot: (path: string) => Promise<void>
};

export const test = base.extend<FixtureType>({
  pageManager: async ({ page, context }, use) => {
    await use(new PageManager(page, context));
  },
  productPage: async ({ pageManager }, use) => {
    await use(pageManager.getProductPage());
  },
  loginPage: async ({ page }, use) => {
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
      } catch (error) {
        logger.error("Initial login process failed:", error);
        throw error;
      }

    await use();
  },
  network: async ({ page }, use) => {
    page.on("response", (response) => {
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