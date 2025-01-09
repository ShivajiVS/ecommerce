import { test, expect } from "@playwright/test";

test.only("End-to-end checkout flow: Product selection, checkout, order confirmation, and logout.", async ({
  page,
}) => {
  await page.goto("/");

  // Select first product section and validate
  const listOfProducts = await page.getByTestId("products").nth(0);
  await expect(listOfProducts).toBeVisible();

  // Select products within the section and check if any products exist
  const products = await listOfProducts.getByTestId("product");
  expect(await products.count()).toBeGreaterThan(0);

  // Click on the 4th product (0-indexed)
  await products.nth(3).click();
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
});
