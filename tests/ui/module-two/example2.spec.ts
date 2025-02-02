import { test } from "../../../src/fixtures/baseFixture";
import { LoginPage } from "../../../src/pages/loginPage";
import { ProductPage } from "../../../src/pages/productPage";
import { CommonUtils } from "../../../src/utils/commonUtils";
//import testData from "../../../test-data/testData.json";

test.describe("Login Tests 2", () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ pageManager }) => {
    loginPage = pageManager.getLoginPage();
    productPage = pageManager.getProductPage();
  });

  test("TC2: Verify login and logout functionality", { tag: "@functional" }, async ({ login }) => {
    await login();
    //console.log(testData.text);
  });
});
