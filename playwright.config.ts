import { defineConfig,devices } from '@playwright/test';
import {loadEnvironmentConfig,getEnvironmentSettings} from "./src/utils/environmentUtils"
import { testConfig } from './config/testConfig';

loadEnvironmentConfig()
const { HEADLESS_MODE } = getEnvironmentSettings()
//export const STORAGE_STATE = path.join(__dirname, 'authentication/.auth/admin.json');
export default defineConfig({
  testDir: './tests',
  //testMatch:"**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html',{open:'never'}]],
  use: {
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  //  storageState: STORAGE_STATE,
    baseURL: testConfig.baseURL,
  },
  projects: [
    // {
    //   name:'setup',
    //   testMatch:"**/preCondition.setup.js"
    // },
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], 
    //     channel: 'msedge',
    //     headless: false
    //    },
    // },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        headless: HEADLESS_MODE
       },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'],
    //     // headless: false 
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'],
    //     // headless: false 
    //   },
    // },
  ],
});
