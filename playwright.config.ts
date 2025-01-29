import { defineConfig,devices } from '@playwright/test';
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
    headless:process.env.CI ? true : false
  },
  projects: [
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], 
    //     channel: 'msedge',
    //     headless: false
    //    },
    // },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']
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
