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

test.describe("sign-up page functionality testing", () => {
  test("should display an errors for empty full name and email", async ({
    page,
  }) => {
    await page.goto("/sign-up");

    await page.getByRole("button", { name: "Next" }).click();

    const fullNameErrorMessage = await page
      .getByTestId("fullNameErrorMessage")
      .textContent();

    expect(fullNameErrorMessage?.trim()).toBe("required.");

    const emailErrorMessage = await page
      .getByTestId("emailErrorMessage")
      .textContent();

    expect(emailErrorMessage?.trim()).toBe("Invalid email.");
  });

  test("should display an error for less than 4 characters of full name", async ({
    page,
  }) => {
    await page.goto("/sign-up");

    const password = page.getByTestId("fullName");
    await password.fill("sdd");

    await page.getByRole("button", { name: "Next" }).click();

    const fullNameErrorMessage = await page
      .getByTestId("fullNameErrorMessage")
      .textContent();

    expect(fullNameErrorMessage?.trim()).toBe("Too short.");
  });

  test("should allow only alphabetic characters in the fullname input field and reject numbers or special symbols", async ({
    page,
  }) => {
    await page.goto("/sign-up");

    const password = page.getByTestId("fullName");
    await password.fill("sdd12@#");

    await page.getByRole("button", { name: "Next" }).click();

    const fullNameErrorMessage = await page
      .getByTestId("fullNameErrorMessage")
      .textContent();

    expect(fullNameErrorMessage?.trim()).toBe(
      "FullName can only contain letters and spaces"
    );
  });

  test("should display an error for invalid email format", async ({ page }) => {
    await page.goto("/sign-up");

    const email = page.getByTestId("email");
    await email.fill("shivaji#gmail.com");

    await page.getByRole("button", { name: "Next" }).click();

    const emailErrorMessage = await page
      .getByTestId("emailErrorMessage")
      .textContent();

    expect(emailErrorMessage?.trim()).toBe("Invalid email.");
  });

  test.only("should display a password and confirm passwords input fields", async ({
    page,
  }) => {
    await page.goto("/sign-up");

    const fullName = page.getByTestId("fullName");
    await fullName.fill("shivaji");

    const email = page.getByTestId("email");
    await email.fill("shivaji@gmail.com");

    await page.getByRole("button", { name: "Next" }).click();

    await expect(page.getByTestId("password")).toBeVisible();

    await expect(page.getByTestId("confirmPassword")).toBeVisible();
  });
});
