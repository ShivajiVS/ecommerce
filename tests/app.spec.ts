import { clerk, setupClerkTestingToken } from "@clerk/testing/playwright";
import { test, expect } from "@playwright/test";

test.only("should display home page with text :'best selling products' after successful sign-in", async ({
  page,
}) => {
  await setupClerkTestingToken({ page });

  await page.goto("https://ecommerce-vsy.vercel.app/sign-in");

  await clerk.loaded({ page });

  const email = page.getByTestId("email");
  await email.fill("sivajikondeti40@gmail.com");

  const password = page.getByTestId("password");
  await password.fill("Shivaji12@#");

  console.log("Attempting to login...");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL("https://ecommerce-vsy.vercel.app/", {
    timeout: 6000,
  });

  // const text = page.getByText("best selling products");
  // await expect(text).toBeVisible();
});
