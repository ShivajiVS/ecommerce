import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  outputDir: "test-results/",
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  timeout: 60 * 1000,
  use: {
    // baseURL: "https://ecommerce-vsy.vercel.app/",
    baseURL: "http://localhost:3000/",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "global setup",
      // testMatch: "global.setup.ts",
      // testMatch: /.*global\.setup\.ts/,
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      testMatch: "**/*.spec.ts", // Matches other test files
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.clerk/user.json",
      },
      dependencies: ["global setup"],
    },
  ],
});
