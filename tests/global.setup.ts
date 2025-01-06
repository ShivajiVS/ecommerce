import { clerk, clerkSetup } from "@clerk/testing/playwright";
import { expect, test as setup } from "@playwright/test";
import path from "path";

setup("global setup", async ({}) => {
  await clerkSetup();

  if (
    !process.env.E2E_CLERK_USER_USERNAME ||
    !process.env.E2E_CLERK_USER_PASSWORD
  ) {
    throw new Error(
      "Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables."
    );
  }
});

const authFile = path.join(__dirname, "./playwright/.clerk/user.json");

setup("authenticate and save state to storage", async ({ page }) => {
  await page.goto("/");
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: process.env.E2E_CLERK_USER_USERNAME!,
      password: process.env.E2E_CLERK_USER_PASSWORD!,
    },
  });
  await page.goto("/");

  const text = page.getByText("best selling products");
  await expect(text).toBeVisible();

  await page.context().storageState({ path: authFile });
});
