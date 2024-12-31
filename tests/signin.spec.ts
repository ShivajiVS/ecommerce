import { test, expect } from "@playwright/test";

test("should render the sign-in page correctly", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");

  const heading = await page.getByRole("heading", { name: "Login" });

  await expect(heading).toBeVisible();
});

test("should have a visible email and password input fields", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/sign-in");
  const email = await page.getByRole("textbox", { name: "Email" });
  await expect(email).toBeVisible();

  const password = await page.getByRole("textbox", { name: "*************" });
  await expect(password).toBeVisible();
});

test("should disable the Sign In button by default", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");
  const loginButton = await page.getByRole("button", { name: "Login" });
  await expect(loginButton).not.toBeDisabled();
});

test('should display a "Forgot Password?" link', async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");

  const forgotButton = await page.getByRole("link", {
    name: "Forgot your password",
  });

  await expect(forgotButton).toBeVisible();
})