import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { waitForLoadState } from "../helpers/waitHelper";
import { DialogComponent } from "./components/dialogComponent";
import { NavbarComponent } from "./components/navbarComponent";

export class LoginPage extends BasePage {
  private username: Locator;
  private loginButton: Locator;
  private password: Locator;
  private dialogComponent: DialogComponent;
  private navbarComponent: NavbarComponent;

  constructor(page: Page) {
    super(page);
    this.username = this.page.locator("#user-name");
    this.password = this.page.locator("#password");
    this.loginButton = this.page.locator("#login-button");
    this.dialogComponent = new DialogComponent(page);
    this.navbarComponent = new NavbarComponent(page);
  }

  async loginToApplication(username: string, pass: string): Promise<void> {
    await this.type(this.username, username);
    await this.type(this.password, pass);
    await this.click(this.loginButton);
  }

  async testLoginFn() {
    await this.navbarComponent.clickHomePage(); // For this page file we use navbarComponent just for example
    await this.dialogComponent.confirm(); // For this page file we use dialogComponent just for example
    console.log("This is a test function");
    await waitForLoadState(this.page, "load");
  }
}
