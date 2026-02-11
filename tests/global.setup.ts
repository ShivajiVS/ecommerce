import { clerk, clerkSetup } from "@clerk/testing/playwright";
import { chromium, expect } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.clerk/user.json");

async function globalSetup() {
  // Setup Clerk
  await clerkSetup({
    frontendApiUrl: "https://smart-ferret-91.clerk.accounts.dev",
  });

  // Launch browser and authenticate
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://ecommerce-vsy.vercel.app/");
  await clerk.loaded({ page });
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: "sivajikondeti40@gmail.com",
      password: "Shivaji12@#",
    },
  });

  await page.goto("https://ecommerce-vsy.vercel.app/");
  await expect(page.getByText("best selling products")).toBeVisible();

  // Save authentication state
  await context.storageState({ path: authFile });
  await browser.close();
}

export default globalSetup;
