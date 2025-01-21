import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { BasePage } from '../pages/basePage';
import { testConfig } from '../../config/testConfig';


export const test = baseTest.extend<{
    homePage: HomePage;
    basePage: BasePage;
}>({
    homePage: async ({ page, context }, use) => {
        await use(new HomePage(page, context));
    },
    basePage: async ({ page, context }, use) => {
        await use(new BasePage(page, context));
    },
    page: async ({ page }, use) => {
        await page.goto(`${testConfig.baseURL}`);
        await use(page);
      }
})