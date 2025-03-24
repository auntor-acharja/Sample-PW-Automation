import { Page, Locator } from "@playwright/test";
import { logger } from "../utils/logger";
import { waitForLoadState } from "../helpers/waitHelper";
import { click } from "../helpers/actionHelper";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    try {
      await this.page.goto(url);
      logger.info(`Navigated to URL: ${url}`);
      await waitForLoadState(this.page, "networkidle");
      await waitForLoadState(this.page, "load");
    } catch (error) {
      logger.error(`Failed to navigate to URL: ${url}`, error);
      throw error;
    }
  }

  async getNewPopupPage(buttonSelector: Locator): Promise<Page> {
    try {
      const [newPage] = await Promise.all([
        this.page.waitForEvent("popup"),
        await click(buttonSelector),
      ]);
      logger.info(`New popup page opened`);
      return newPage;
    } catch (error) {
      logger.error(`Error while handling new popup page: ${error}`);
      throw error;
    }
  }

  async pageReload(): Promise<void> {
    try {
      await this.page.reload();
      logger.info(`Reloaded the page`);
      // await waitForLoadState(this.page, "networkidle");
      await waitForLoadState(this.page, "load");
    } catch (error) {
      logger.error(`Failed to reload the page`, error);
      throw error;
    }
  }

  async goBack(): Promise<void> {
    try {
      await this.page.goBack();
      logger.info(`Navigated back`);
      await waitForLoadState(this.page, "networkidle");
      await waitForLoadState(this.page, "load");
    } catch (error) {
      logger.error(`Failed to navigate back`, error);
      throw error;
    }
  }

  async goForward(): Promise<void> {
    try {
      await this.page.goForward();
      logger.info(`Navigated forward`);
      await waitForLoadState(this.page, "networkidle");
      await waitForLoadState(this.page, "load");
    } catch (error) {
      logger.error(`Failed to navigate forward`, error);
      throw error;
    }
  }

  async getURL(): Promise<string> {
    try {
      const url = this.page.url();
      logger.info(`URL is: "${url}"`);
      return url;
    } catch (error) {
      logger.error(`Failed to retrieve URL`, error);
      throw error;
    }
  }

  async getPageTitle(): Promise<string> {
    try {
      const title = await this.page.title();
      logger.info(`Page title: "${title}"`);
      return title;
    } catch (error) {
      logger.error(`Failed to retrieve page title`, error);
      throw error;
    }
  }
}
