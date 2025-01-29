import { Page, Locator } from "@playwright/test";
import { logger } from "../utils/logger";

export class BasePage {
    private readonly TIME_OUT = 15000;
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string): Promise<void> {
        try {
            await this.page.goto(url);
            logger.info(`Navigated to URL: ${url}`);
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            logger.error(`Failed to navigate to URL: ${url}`, error);
            throw error;
        }
    }

    async goBack(): Promise<void> {
        try {
            await this.page.goBack();
            logger.info(`Navigated back`);
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            logger.error(`Failed to navigate back`, error);
            throw error;
        }
    }

    async goForward(): Promise<void> {
        try {
            await this.page.goForward();
            logger.info(`Navigated forward`);
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            logger.error(`Failed to navigate forward`, error);
            throw error;
        }
    }

    async waitForVisible(locator: Locator, timeout: number = this.TIME_OUT): Promise<void> {
        try {
            logger.info(`Waiting for element: ${locator} to be visible`);
            await locator.waitFor({ state: 'visible', timeout });
            logger.info(`Element is now visible`);
        } catch (error) {
            logger.error(`Element did not become visible: ${locator}`, error);
            throw error;
        }
    }

    async click(locator: Locator): Promise<void> {
        try {
            await this.waitForVisible(locator);
            await locator.click();
            logger.info(`Clicked element: ${locator}`);
            await this.page.waitForLoadState('networkidle');
        } catch (error) {
            logger.error(`Failed to click element: ${locator}`, error);
            throw error;
        }
    }

    async type(locator: Locator, text: string): Promise<void> {
        try {
            await this.waitForVisible(locator);
            await locator.fill(text);
            logger.info(`Typed "${text}" into element: ${locator}`);
        } catch (error) {
            logger.error(`Failed to type into element: ${locator}`, error);
            throw error;
        }
    }

    async clear(locator: Locator): Promise<void> {
        try {
            await this.waitForVisible(locator);
            await locator.clear();
            logger.info(`Cleared input element: ${locator}`);
        } catch (error) {
            logger.error(`Failed to clear input element: ${locator}`, error);
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

    async getText(locator: Locator): Promise<string> {
        try {
            await this.waitForVisible(locator);
            const text = await locator.textContent() || '';
            logger.info(`Text extracted: "${text}"`);
            return text;
        } catch (error) {
            logger.error(`Failed to get text from element: ${locator}`, error);
            throw error;
        }
    }

    async getInnerText(locator: Locator): Promise<string> {
        try {
            const text = await locator.innerText();
            logger.info(`Inner text: "${text}"`);
            return text;
        } catch (error) {
            logger.error(`Failed to get inner text from element: ${locator}`, error);
            throw error;
        }
    }

    async getInputValue(locator: Locator): Promise<string> {
        try {
            const value = await locator.inputValue();
            logger.info(`Input value: "${value}"`);
            return value;
        } catch (error) {
            logger.error(`Failed to get input value from element: ${locator}`, error);
            throw error;
        }
    }

    async isVisible(locator: Locator): Promise<boolean> {
        try {
            const isVisible = await locator.isVisible();
            logger.info(`Element: ${locator} is ${isVisible ? 'visible' : 'not visible'}`);
            return isVisible;
        } catch (error) {
            logger.error(`Failed to check visibility of element: ${locator}`, error);
            throw error;
        }
    }

    async isHidden(locator: Locator): Promise<boolean> {
      try {
          const isHidden = await locator.isHidden();
          logger.info(`Element: ${locator} is ${isHidden ? 'hidden' : 'not hidden'}`);
          return isHidden;
      } catch (error) {
          logger.error(`Failed to check if element is hidden: ${locator}`, error);
          throw error;
      }
  }
  

  async isDisabled(locator: Locator): Promise<boolean> {
    try {
        const isDisabled = await locator.isDisabled();
        logger.info(`Element: ${locator} is ${isDisabled ? 'disabled' : 'not disabled'}`);
        return isDisabled;
    } catch (error) {
        logger.error(`Failed to check if element is disabled: ${locator}`, error);
        throw error;
    }
}

async isEnabled(locator: Locator): Promise<boolean> {
    try {
        const isEnabled = await locator.isEnabled();
        logger.info(`Element: ${locator} is ${isEnabled ? 'enabled' : 'not enabled'}`);
        return isEnabled;
    } catch (error) {
        logger.error(`Failed to check if element is enabled: ${locator}`, error);
        throw error;
    }
}

async isChecked(locator: Locator): Promise<boolean> {
  try {
      const isChecked = await locator.isChecked();
      logger.info(`Element: ${locator} is ${isChecked ? 'checked' : 'not checked'}`);
      return isChecked;
  } catch (error) {
      logger.error(`Failed to check if element is checked: ${locator}`, error);
      throw error;
  }
}


}
