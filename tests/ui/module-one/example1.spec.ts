import { test } from "../../../src/fixtures/baseFixture";
import testData from "../../../test-data/testData.json" assert { type: "json" };
import { generateRandomString } from "../../../src/utils/randomUtils";

test.describe("Example 1 Tests", () => {
  test.beforeEach(async ({ network, login }) => {  // network and login fixtures are defined in baseFixture.ts, they will auto call before each test
    console.log("Running before each test...");
  });
  test(
    "TC1: Verify login and logout functionality",
    { tag: "@smoke" },
    async ({ loginPage, menu, saveScreenshot }) => {

      await loginPage.testLoginFn();
      await saveScreenshot("screenshots/login.png");
      console.log(generateRandomString("app"));
      console.log(generateRandomString("module", 2));
      console.log(testData.text);
      await menu.logout();
    }
  );
});
