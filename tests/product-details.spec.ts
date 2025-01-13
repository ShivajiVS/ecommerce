import { test, expect, Page } from "@playwright/test";

let page: Page;

test.describe("Product Details Page", () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/");

    // Select the first product section and validate its visibility
    const listOfProducts = page.getByTestId("products").nth(0);
    await expect(listOfProducts).toBeVisible();

    // Ensure there are products within the section
    const products = listOfProducts.getByTestId("product");
    expect(await products.count()).toBeGreaterThan(0);

    // Click on the 7th product (0-indexed)
    await products.nth(6).click();
    await expect(page).toHaveURL(/\/product\/.*/);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Product title should be visible", async () => {
    await expect(page.getByTestId("title")).toBeVisible();
  });

  test("Product description should be visible", async () => {
    await expect(page.getByTestId("description")).toBeVisible();
  });

  test("Product image should be visible", async () => {
    await expect(page.getByAltText("Image 1")).toBeVisible();
  });

  test("Add to Bag button should be visible", async () => {
    await expect(page.getByTestId("addToBag").nth(0)).toBeVisible();
  });

  test("Size button should be visible", async () => {
    await expect(page.getByTestId("size").nth(0)).toBeVisible();
  });

  test("Click on one of the size buttons and verify the specific size is selected", async () => {
    await page.getByTestId("size").nth(1).click();

    // Verify that the clicked button has 'border-blue-500' class
    const sizeButtons = page.getByTestId("size");
    const count = await sizeButtons.count();

    let selectedIndex = -1;
    for (let i = 0; i < count; i++) {
      const hasBorderClass = await sizeButtons
        .nth(i)
        .evaluate((el) => el.classList.contains("border-blue-500"));
      if (hasBorderClass) {
        selectedIndex = i;
        break;
      }
    }

    expect(selectedIndex).toBe(1); // Verify the 2nd button is selected
  });

  test("Product should be added to the bag", async () => {
    await page.getByTestId("size").nth(0).click();
    await page.getByTestId("addToBag").nth(0).click();

    // Validate the updated bag count
    const bagValue = await page.getByTestId("bagCount").textContent();
    expect(bagValue?.trim()).toBe("1");
  });
});
