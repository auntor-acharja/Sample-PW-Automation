import { test as base, expect, Page } from "@playwright/test";
import { PageManager } from "../pages/pageManager";
import { environment } from "../utils/environmentUtils";
import { FileHelper } from "../helpers/fileHelper";
import { ClipboardHelper } from "../helpers/clipboardHelper";
import { logger } from "../utils/logger";

type FixtureType = {
  pageManager: PageManager;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  fileHelper: FileHelper;
  clipboardHelper: ClipboardHelper;
};

export const test = base.extend<FixtureType>({
  pageManager: async ({ page, context }, use) => {
    await use(new PageManager(page, context));
  },
  login: async ({ pageManager }, use) => {
    const loginApplication = async () => {
      try {
        await pageManager.getPage().goto(environment.url);
        await pageManager
          .getLoginPage()
          .loginToApplication(
            environment.credentials.username,
            environment.credentials.password
          );
      } catch (error) {
        logger.error("Initial login process failed:", error);
        throw error;
      }
    };
    await use(loginApplication);
  },
  logout: async ({ pageManager }, use) => {
    const logoutFromApplication = async () => {
      try{
        await pageManager.getMenu().logout();
      }catch (error){
        logger.error("Logout from the application failed", error);
      }
  
    };

    await use(logoutFromApplication);
  },
  fileHelper: async ({ page }, use) => {
    await use(new FileHelper(page));
  },
  clipboardHelper: async ({ page }, use) => {
    await use(new ClipboardHelper(page));
  },
});
