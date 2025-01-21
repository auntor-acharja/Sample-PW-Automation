import {test} from "../src/fixtures/baseTest";
import { STORAGE_STATE } from "../playwright.config";
import { console } from "inspector";

test('Before starting, Store the Login Session',async({page})=>{
    console.log("If needed we can store the login session here")
await page.context().storageState({
    path: STORAGE_STATE
  })
})