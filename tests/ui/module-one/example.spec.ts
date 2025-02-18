import { test,expect } from "../../../src/fixtures/baseFixture";
import testData from "../../../test-data/testData.json" assert { type: "json" };
import { generateRandomString, generateRandomVersion } from "../../../src/utils/randomUtils";

test.describe("Login Tests", () => {
  test.beforeEach(async ({ page,network,login }) => {
    console.log("Running before each test...");
  });
  test.only(
    "TC1: Verify login and logout functionality",
    { tag: "@smoke" },
    async ({ productPage, loginPage, menu, saveScreenshot }) => {
      await loginPage.testLoginFn();
      await saveScreenshot("screenshots/login.png");
      console.log(generateRandomString('app'))
      console.log(generateRandomString('module',2))
      console.log(generateRandomVersion())
      await menu.logout()
    }
  );
});
