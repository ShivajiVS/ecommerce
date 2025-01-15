import { test, expect, Page } from "@playwright/test";

let page: Page;

test.describe("Bag Page", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/");

    // Select the first product section and validate its visibility
    const listOfProducts = page.getByTestId("products").nth(0);
    await expect(listOfProducts).toBeVisible();

    // Ensure there are products within the section
    const products = listOfProducts.getByTestId("product");
    expect(await products.count()).toBeGreaterThan(0);

    // Click on the 3rd product.
    await products.nth(2).click();
    await expect(page).toHaveURL(/\/product\/.*/);

    await page.getByTestId("size").nth(0).click();
    await page.getByTestId("addToBag").nth(0).click();

    // Validate the updated bag count
    const bagValue = await page.getByTestId("bagCount").textContent();
    expect(bagValue?.trim()).toBe("1");
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("should display 1 product in the bag", async () => {
    let bagValue = await page.getByTestId("bagCount").textContent();

    // Ensure the bag count shows "1" after adding a product
    expect(bagValue?.trim()).toBe("1");
  });

  test("should increment and decrement product quantity correctly", async () => {
    // Navigate to the 'bag' page
    page.goto("/bag");

    // Get the first bag item
    const bagItem = page.getByTestId("bagItem").first();

    // Check initial quantity is 1
    expect(await bagItem.getByTestId("quantity").textContent()).toBe("1");

    // Increase quantity
    await bagItem.getByRole("button", { name: "Increase quantity" }).click();
    expect(await bagItem.getByTestId("quantity").textContent()).toBe("2");

    // Decrease quantity
    await bagItem.getByRole("button", { name: "Decrease quantity" }).click();
    expect(await bagItem.getByTestId("quantity").textContent()).toBe("1");
  });
});
