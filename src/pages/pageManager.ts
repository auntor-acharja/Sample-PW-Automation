import { BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { ProductPage } from "./productPage";
import { Menu } from "./components/menu";

export class PageManager {
  private context: BrowserContext;
  private page: Page;
  private loginPage: LoginPage;
  private productPage: ProductPage;
  private menu: Menu;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.loginPage = new LoginPage(page);
    this.productPage = new ProductPage(page);
    this.menu = new Menu(page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getProductPage(): ProductPage {
    return this.productPage;
  }

  getPage(): Page {
    return this.page;
  }

  getContext(): BrowserContext {
    return this.context;
  }

  getMenu(): Menu {
    return this.menu;
  }
}
