// Will not Work in this way

// import { expect, Page } from "playwright/test";
// import { test } from "../../../src/fixtures/baseFixture";
// import testData from "../../../test-data/testData.json" assert { type: "json" };
// import { generateRandomString } from "../../../src/utils/randomUtils";
// test.describe("Multiple Test run on One web page", () => {
//   test.describe.configure({ mode: "serial" });
//   let page: Page;
//   test.beforeAll(async ({ browser }) => {
//     const context = await browser.newContext();
//     page = await context.newPage();
//   });
//   test.afterAll(async ({ browser }) => {
//     await browser.close();
//   });
//   test.beforeEach(async ({ login }) => {
//     console.log("Running before each test...");
//   });
//   test("TC1", async ({ loginPage, menu, saveScreenshot }) => {
//     console.log("Test case 1");
//     await loginPage.testLoginFn();
//     await saveScreenshot("screenshots/login.png");
//     console.log(generateRandomString("app"));
//     console.log(generateRandomString("module", 2));
//     console.log(testData.text);
//     await menu.logout();
//   });
//   test("TC2", async () => {
//     console.log("Test case 2");
//     // expect(await page.title()).toBe("Google");
//   });
// });

import { expect, Page } from "playwright/test";
import { test } from "../../../src/fixtures/baseFixture";
import testData from "../../../test-data/testData.json" assert { type: "json" };
import { generateRandomString } from "../../../src/utils/randomUtils";
import { LoginPage } from "../../../src/pages/loginPage";
import { Menu } from "../../../src/pages/components/menu";
import { environment } from "../../../src/config/config";
test.describe("Multiple Test run on One web page", () => {
  // test.describe.configure({ mode: "serial" });
  let page: Page;
  let loginPage: LoginPage;
  let menu: Menu;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    menu = new Menu(page);
    await page.goto("https://www.saucedemo.com/");
    await loginPage.loginToApplication(
      environment.credentials.username,
      environment.credentials.password
    );
  });
  test.afterAll(async ({ browser }) => {
    await browser.close();
  });
  test.beforeEach("", async () => {
    console.log("Running before each test...");
  });
  test.afterEach("", async () => {
    console.log("Running after each test...");
  });

  test("TC1", async () => {
    console.log("Test case 1");
    await loginPage.testLoginFn();
    console.log(generateRandomString("app"));
  });
  test("TC2", async () => {
    console.log("Test case 2");
    console.log(generateRandomString("module", 2));
    console.log(testData.text);
    await menu.logout();
  });
});

// test.describe("Example 1 Tests", () => {
//   test.beforeEach(async ({ network, login }) => {
//     // network and login fixtures are defined in baseFixture.ts, they will auto call before each test
//     console.log("Running before each test...");
//   });
//   test(
//     "TC1: Verify login and logout functionality",
//     { tag: "@smoke" },
//     async ({ loginPage, menu, saveScreenshot }) => {
//       await loginPage.testLoginFn();
//       await saveScreenshot("screenshots/login.png");
//       console.log(generateRandomString("app"));
//       console.log(generateRandomString("module", 2));
//       console.log(testData.text);
//       await menu.logout();
//     }
//   );
// });
