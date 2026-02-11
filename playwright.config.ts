import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  outputDir: "test-results/",
  reporter: "html",
  timeout: 60 * 1000,
  use: {
    baseURL: "https://ecommerce-vsy.vercel.app/",
    trace: "on-first-retry",
  },

  globalSetup: "./tests/global.setup.ts",

  projects: [
    {
      name: "chromium",
      testMatch: "**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.clerk/user.json",
      },
    },
  ],
});

