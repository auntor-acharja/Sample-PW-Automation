import {test} from "../../src/fixtures/baseTest";
import {expect} from "@playwright/test"
import docModuleData from "../../src/test-data/docModuleData.json"
import { testConfig } from "../../config/testConfig";

test('TC1: Verify URL',{tag:"@smoke"}, async ({ homePage}) => {
  await homePage.clickGetStartedButton()
  expect(await homePage.page.title()).toContain(docModuleData.URL)
  homePage.getStartedButton
});

