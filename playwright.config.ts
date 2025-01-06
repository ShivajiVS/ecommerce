import { defineConfig, devices } from "@playwright/test";
import path from "path";

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// Reference: https://playwright.dev/docs/test-configuration
export default defineConfig({
  timeout: 30 * 1000,
  testDir: "./tests",
  fullyParallel: true,
  retries: 1,
  outputDir: "test-results/",
  webServer: {
    command: "npm run dev",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL: "https://ecommerce-vsy.vercel.app/",
    trace: "retry-with-trace",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "global setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "Main tests",
      testMatch: /.*app.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
      dependencies: ["global setup"],
    },
    {
      name: "Authenticated tests",
      testMatch: /.*authenticated.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],

        // Use prepared Clerk auth state
        storageState: "playwright/.clerk/user.json",
      },
      dependencies: ["global setup"],
    },
  ],
});
