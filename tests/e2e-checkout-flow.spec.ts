import { test, expect } from "@playwright/test";

test.only("End-to-end checkout flow: Product selection, checkout, order confirmation, and logout.", async ({
  page,
}) => {
  await page.goto("/");

  // Select first product section and validate
  const listOfProducts = page.getByTestId("products").nth(0);
  await expect(listOfProducts).toBeVisible();

  // Select products within the section and check if any products exist
  const products = listOfProducts.getByTestId("product");
  expect(await products.count()).toBeGreaterThan(0);

  // Click on the 4th product (0-indexed)
  await products.nth(5).click();
  await expect(page).toHaveURL(/\/product\/.*/);

  // Check initial bag count
  let bagValue = await page.getByTestId("bagCount").textContent();
  expect(bagValue?.trim()).toBe("0");

  // Add the first size option to the bag
  await page.getByTestId("size").nth(0).click();
  await page.getByTestId("addToBag").nth(0).click();

  // Validate updated bag count
  bagValue = await page.getByTestId("bagCount").textContent();
  expect(bagValue?.trim()).toBe("1");

  // Add a different size option to the bag
  await page.getByTestId("size").nth(1).click();
  await page.getByTestId("addToBag").nth(0).click();

  // Validate updated bag count
  bagValue = await page.getByTestId("bagCount").textContent();
  expect(bagValue?.trim()).toBe("2");

  // Navigate to the bag page
  await page.getByTestId("bag").click();
  await expect(page).toHaveURL("/bag");

  await page.getByRole("button", { name: "place order" }).click();

  // stripe payment page
  await page.waitForURL(/\/checkout.stripe.com\/.*/);
  await expect(page).toHaveURL(/\/checkout.stripe.com\/.*/);
  await page.getByPlaceholder("1234 1234 1234").fill("4242 4242 4242 42421");
  await page.getByPlaceholder("MM / YY").fill("12 / 292");
  await page.getByPlaceholder("CVC").fill("322");
  await page.getByPlaceholder("Full name on card").fill("shivaji12@#");
  await page.getByTestId("hosted-payment-submit-button").click();

  //order page(succesfull payment)
  await page.waitForURL(/\/orders\/.*/);
  // Assert that the "Thank you for ordering" heading is visible
  await expect(
    page.getByRole("heading", { name: "Thank you for ordering" })
  ).toBeVisible();

  await page.getByRole("button", { name: "View order" }).click();

  // Wait for the orders page to load
  await page.waitForURL(/^(http|https):\/\/[^\/]+\/orders(\/.*)?$/);

  // Assert the presence and visibility of the "Order history" heading
  await expect(
    page.getByRole("heading", { name: "Order history" })
  ).toBeVisible();

  await page.goto("/");
  await page.getByTestId("account").click();
  await expect(page.getByTestId("signOut")).toBeVisible();
  await page.getByTestId("signOut").click();

  await page.getByTestId("account").click();
  await expect(page.getByTestId("signIn")).toBeVisible();
});
