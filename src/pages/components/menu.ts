import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { click } from "../../helpers/actionHelper";

export class Menu extends BasePage {
  private menuButton: Locator;
  private logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = this.page.locator("#react-burger-menu-btn");
    this.logoutLink = this.page.locator("#logout_sidebar_link");
  }

  async openMenu(): Promise<void> {
    await click(this.menuButton);
  }
  async logout(): Promise<void> {
    await this.openMenu();
    await click(this.logoutLink);
  }
}
