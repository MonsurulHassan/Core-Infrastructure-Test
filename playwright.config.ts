import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
import * as path from 'path';

const envArg = process.env.ENV || "local";
let envFile = "credentials.env";
if (envArg === "stage") envFile = "credentials.stage.env";
else if (envArg === "test1") envFile = "credentials.test1.env";
else if (envArg === "test2") envFile = "credentials.test2.env";
dotenv.config({ path: path.resolve(__dirname, envFile) });

export default defineConfig({
  testDir: './',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: "on-first-retry",
    testIdAttribute: "data-test-element-id",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: process.env.CI ? true : false,
  },

  /* Configure projects for browsers */
  projects: [
    {
      name: "Auth Setup",
      use: { ...devices["Desktop Edge"], channel: 'msedge' },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
      dependencies: ["Auth Setup"],
    },
  ],
});
