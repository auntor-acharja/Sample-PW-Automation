import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { getText } from "../../helpers/elementsHelper";
export class DialogComponent extends BasePage {
  private alertMessage: Locator;
  constructor(page: Page) {
    super(page);
    this.alertMessage = this.page.locator("text=Alert message");
  }

  async confirm() {
    await this.page.click("text=OK");
  }

  async cancel() {
    await this.page.click("text=Cancel");
  }

  async getAlertMessage() {
    return await getText(this.alertMessage);
  }
}
