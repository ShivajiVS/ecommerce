import { clerk, clerkSetup } from "@clerk/testing/playwright";
import { expect, test as setup } from "@playwright/test";
import path from "path";

setup.describe.configure({ mode: "serial" });

setup("global setup", async ({}) => {
  await clerkSetup({
    frontendApiUrl: "https://smart-ferret-91.clerk.accounts.dev",
  });
});

const authFile = path.join(__dirname, "../playwright/.clerk/user.json");

setup("authenticate and save state to storage", async ({ page }) => {
  await page.goto("/");
  await clerk.loaded({ page });
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: "sivajikondeti40@gmail.com",
      password: "Shivaji12@#",
    },
  });

  // process.env.NEXT_PUBLIC_E2E_CLERK_USER_USERNAME!
  // process.env.NEXT_PUBLIC_E2E_CLERK_USER_PASSWORD!

  await page.goto("/");

  const text = page.getByText("best selling products");
  await expect(text).toBeVisible();

  await page.context().storageState({ path: authFile });
});
