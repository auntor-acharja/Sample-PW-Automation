import { test } from "../../../src/fixtures/baseFixture";
import { LoginPage } from "../../../src/pages/loginPage";
import { ProductPage } from "../../../src/pages/productPage";
import { CommonUtils } from "../../../src/utils/commonUtils";
import { Menu } from "../../../src/pages/components/menu";
import testData from "../../../test-data/testData.json" assert { type: "json" };


test.describe("Login Tests", () => {
  let menu: Menu;

  test.beforeEach(async ({ pageManager }) => {
    menu = pageManager.getMenu();
  });

  test.only(
    "TC1: Verify login and logout functionality",
    { tag: "@smoke" },
    async ({ login, productPage, loginPage }) => {
      await login();
      console.log(testData.text);
      console.log(await productPage.isProductTitleVisible());
      await loginPage.testLoginFn();
      await menu.logout();
    }
  );
});
