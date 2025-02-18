import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
export class NavbarComponent extends BasePage {
  private home: Locator;
  constructor(page: Page) {
    super(page);
    this.home = this.page.locator("text=Home");
  }

  async clickHomePage() {
    console.log("This is navbar component");
    //await this.click(this.home);
  }
}
