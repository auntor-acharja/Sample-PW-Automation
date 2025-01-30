import { test } from "../../../src/fixtures/baseFixture";
import { LoginPage } from "../../../src/pages/loginPage";
import { ProductPage } from "../../../src/pages/productPage";
import { CommonUtils } from "../../../src/utils/commonUtils";
import { Menu } from "../../../src/pages/components/menu";
import testData from "../../../test-data/testData.json"

test.describe("Login Tests", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let menu:Menu

  test.beforeEach(async ({ pageManager }) => {
    loginPage = pageManager.getLoginPage();
    productPage = pageManager.getProductPage();
    menu = pageManager.getMenu()
  });

  test("TC1: Verify login and logout functionality", { tag:'@smoke' }, async ({ login }) => {
    await login();
    console.log(testData.text)
    await menu.logout()
  });

});
