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

  test("should bag page visible or not", async () => {
    await page.goto("/bag");
    await expect(page.getByRole("heading", { name: "My bag" })).toBeVisible();
  });

  test("should display 1 product in the bag", async () => {
    let bagValue = await page.getByTestId("bagCount").textContent();

    // Ensure the bag count shows "1" after adding a product
    expect(bagValue?.trim()).toBe("1");
  });

  test("should increment and decrement product quantity correctly", async () => {
    await page.goto("/bag");

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

  test("should remove the product from the bag", async () => {
    await page.goto("/bag");
    let bagItem = page.getByTestId("bagItem").first();

    await bagItem.getByRole("button", { name: "Remove item" }).click();

    bagItem = page.getByTestId("bagItem");

    expect(await bagItem.count()).toBe(0);
  });

  test("should dsiplays a 'your Bag is Empty' after removing the product from the bag", async () => {
    await page.goto("/bag");

    let bagItem = page.getByTestId("bagItem").first();

    await bagItem.getByRole("button", { name: "Remove item" }).click();

    expect(
      page.getByRole("heading", { name: "Your Shopping Bag is Empty!" })
    ).toBeVisible();
  });

  test("should displays a total mrp and total amount", async () => {
    await page.goto("/bag");

    await expect(page.getByTestId("totalMrp")).toBeVisible();

    await expect(page.getByTestId("total")).toBeVisible();
  });

  test("should signIn button works correctly", async () => {
    await page.goto("/bag");

    await expect(page.getByRole("button", { name: "SignIn" })).toBeVisible();

    await page.getByRole("button", { name: "SignIn" }).click();

    await page.waitForURL("/sign-in");
    await expect(page).toHaveURL("/sign-in");
  });
});
