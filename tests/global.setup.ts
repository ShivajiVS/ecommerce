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
  await page.goto("/");

  await expect(page.getByText("best selling products")).toBeVisible();

  await page.context().storageState({ path: authFile });
});
