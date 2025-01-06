import { expect, test } from "@playwright/test";

test.use({ storageState: "playwright/.clerk/user.json" });

test.describe("authenticated tests", () => {
  test("already signed in", async ({ page }) => {
    await page.goto("/");
    const text = page.getByText("best selling products");
    await expect(text).toBeVisible();
  });
});
