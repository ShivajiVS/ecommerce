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

    // // Navigate to the bag page
    // page.goto("/");
    // await page.getByTestId("bag").click();
    // await expect(page).toHaveURL("/bag");
    // await page.waitForTimeout(5000);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("bag has 1 product", async () => {
    let bagValue = await page.getByTestId("bagCount").textContent();
    expect(bagValue?.trim()).toBe("1");
    await page.waitForTimeout(5000);
  });
});
