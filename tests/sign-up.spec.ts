import { test, expect } from "@playwright/test";

import { clerk, setupClerkTestingToken } from "@clerk/testing/playwright";

test.use({
  storageState: { cookies: [], origins: [] },
});

test.describe("sign-up page UI testing", () => {
  test("should render the sign-up page correctly", async ({ page }) => {
    await page.goto("/sign-up");

    await expect(
      page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();
  });

  test("should have a visible fullName and email input fields", async ({
    page,
  }) => {
    await page.goto("/sign-up");

    await expect(page.getByTestId("fullName")).toBeVisible();

    await expect(page.getByTestId("email")).toBeVisible();
  });

  test("should disable the 'Next' button by default", async ({ page }) => {
    await page.goto("/sign-up");

    await expect(page.getByRole("button", { name: "Next" })).not.toBeDisabled();
  });
});
