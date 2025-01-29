import {test} from "../../../src/fixtures/baseFixture"
import { LoginPage } from "../../../src/pages/loginPage";
import { ProductPage } from "../../../src/pages/productPage";
import { CommonUtils } from "../../../src/utils/commonUtils";

const testData = CommonUtils.loadJson('test-data/testData.json')
test.describe('',()=>{
  let loginPage: LoginPage;
  let productPage: ProductPage;
  
  test.beforeEach(async ({ pageManager }) => {
    loginPage = pageManager.getLoginPage();
    productPage = pageManager.getProductPage();
  });
  test('TC1: Verify URL',{tag:"@smoke"}, async ({loginApplication,logoutFromApplication}) => {
    await loginApplication()
    console.log("Call")
    await logoutFromApplication()
  });
  
  // test('TC1: Verify URL',{tag:"@smoke"}, async ({ }) => {
  
  // });
  
})
