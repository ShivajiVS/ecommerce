import { test, expect } from "@playwright/test";

test("should render the sign-in page correctly", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");

  const heading = page.getByRole("heading", { name: "Login" });

  await expect(heading).toBeVisible();
});

test("should have a visible email and password input fields", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/sign-in");
  const email = page.getByLabel("email");
  await expect(email).toBeVisible();

  const password = page.getByLabel("password");
  await expect(password).toBeVisible();

});

test("should disable the Sign In button by default", async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");

  const loginButton = page.getByRole("button", { name: "Login" });
  await expect(loginButton).not.toBeDisabled();
});

test('should display a "Forgot Password?" link', async ({ page }) => {
  await page.goto("http://localhost:3000/sign-in");

  const forgotButton = page.getByRole("link", {
    name: "Forgot your password",
  });

  await expect(forgotButton).toBeVisible();
});
