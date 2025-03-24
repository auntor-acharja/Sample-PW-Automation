import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { waitForLoadState } from "../helpers/waitHelper";
import { DialogComponent } from "./components/dialogComponent";
import { NavbarComponent } from "./components/navbarComponent";
import { click, type } from "../helpers/actionHelper";

export class LoginPage extends BasePage {
  private username: Locator;
  private loginButton: Locator;
  private password: Locator;
  readonly dialogComponent: DialogComponent;
  readonly navbarComponent: NavbarComponent;

  constructor(page: Page) {
    super(page);
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.dialogComponent = new DialogComponent(page);
    this.navbarComponent = new NavbarComponent(page);
  }

  async loginToApplication(username: string, pass: string): Promise<void> {
    await type(this.username, username);
    await type(this.password, pass);
    await click(this.loginButton);
  }

  async testLoginFn() {
    await this.navbarComponent.clickHomePage(); // For this page file we use navbarComponent just for example
    await this.dialogComponent.confirm(); // For this page file we use dialogComponent just for example
    console.log("This is a test function");
    await waitForLoadState(this.page, "load");
  }
}
