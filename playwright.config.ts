import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  //testMatch:"**/*.spec.ts",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }]],
  use: {
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    headless: process.env.CI ? true : false,
  },
  projects: [
    // {
    //   name: "edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },

    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //   },
    // },

    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //   },
    // },
  ],
});
