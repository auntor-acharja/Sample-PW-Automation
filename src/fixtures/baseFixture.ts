import { test as base, expect, Page } from "@playwright/test";
import { PageManager } from "../pages/pageManager";
import { environment } from "../utils/environmentUtils";
import { FileHelper } from "../helpers/fileHelper";
import { ClipboardHelper } from "../helpers/clipboardHelper";

type FixtureType = {
  pageManager: PageManager;
  loginApplication: () => Promise<void>;
  logoutFromApplication: () => Promise<void>;
  fileHelper: FileHelper;
  clipboardHelper: ClipboardHelper;
};

export const test = base.extend<FixtureType>({
  pageManager: async ({ page, context }, use) => {
    await use(new PageManager(page, context));
  },
  loginApplication: async ({ page,context },use) => {
    const pageManager = new PageManager(page,context)
    try {
      console.log(environment.url)
      await pageManager.getPage().goto(environment.url);
      await pageManager
        .getLoginPage()
        .loginToTheApplication(
          environment.credentials.username,
          environment.credentials.password
        );
      // expect(
      //   await pageManager.getProductPage().isProductTitleVisible()
      // ).toBeTruthy();
    } catch (error) {
      console.error("Initial login process failed:", error);
      throw error;
    }
    await use(page)
  },
  logoutFromApplication: async ({ page,context},use) => {
    const pageManager = new PageManager(page,context)
    await pageManager.getMenu().logout();
    await use(page)
  },
  fileHelper: async ({ page }, use) => {
    await use(new FileHelper(page));
  },
  clipboardHelper: async ({ page }, use) => {
    await use(new ClipboardHelper(page));
  },
});

