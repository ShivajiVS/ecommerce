
import { test, expect } from "@playwright/test";

const SIGN_IN_URL = "http://localhost:3000/sign-in";

test.describe("sign-in page UI testing", ()=>{


      test("should render the sign-in page correctly", async ({ page }) => {
      await page.goto(SIGN_IN_URL);

      const heading = page.getByRole("heading", { name: "Login" });

      await expect(heading).toBeVisible();
    });

    test("should have a visible email and password input fields", async ({
      page,
    }) => {
      await page.goto(`${SIGN_IN_URL}`)
      const email = page.getByTestId("email");
      await expect(email).toBeVisible();

      const password = page.getByTestId("password");
      await expect(password).toBeVisible();
    });

    test("should disable the Sign In button by default", async ({ page }) => {
      await page.goto(${SIGN_IN_UR});

      const loginButton = page.getByRole("button", { name: "Login" });
      await expect(loginButton).not.toBeDisabled();
    });

    test('should display a "Forgot Password?" link', async ({ page }) => {
      await page.goto(${SIGN_IN_UR});

      const forgotButton = page.getByRole("link", {
        name: "Forgot your password",
      });

      await expect(forgotButton).toBeVisible();
    })
})


test.describe("sign-in page functionality testing", ()=>{

  test("should display an errors for empty email and password", async ({
    page,
  }) => {
    await page.goto(${SIGN_IN_UR});

    await page.getByRole("button", { name: "Login" }).click();

    const emailErrorMessage = await page
      .getByTestId("emailErrorMessage")
      .textContent();

    expect(emailErrorMessage?.trim()).toBe("required");

    const passwordErrorMessage = await page
      .getByTestId("passwordErrorMessage")
      .textContent();

    expect(passwordErrorMessage?.trim()).toBe("required");
  });

  test("should display an error for invalid email format", async ({
    page,
  }) => {
    await page.goto(${SIGN_IN_UR});

    const email = page.getByTestId("email");
    await email.fill("shivaji#gmail.com");

    await page.getByRole("button", { name: "Login" }).click();

    const emailErrorMessage = await page
      .getByTestId("emailErrorMessage")
      .textContent();

    await expect(emailErrorMessage?.trim()).toBe("Invalid email.");
  });

  test("should display an error for less than 8 characters of password", async ({
    page,
  }) => {
    await page.goto(${SIGN_IN_UR});

    const password = page.getByTestId("password");
    await password.fill("111");

    await page.getByRole("button", { name: "Login" }).click();

    const passwordErrorMessage = await page
      .getByTestId("passwordErrorMessage")
      .textContent();

    await expect(passwordErrorMessage?.trim()).toBe("Password must be at least 8 characters long.");
  });

  test("should display an error for more than 8 characters of password but without any digits", async ({
    page,
  }) => {
    await page.goto(${SIGN_IN_UR});

    const password = page.getByTestId("password");
    await password.fill("Test@jhd");

    await page.getByRole("button", { name: "Login" }).click();

    const passwordErrorMessage = await page
      .getByTestId("passwordErrorMessage")
      .textContent();

    await expect(passwordErrorMessage?.trim()).toBe("Password must include at least one number.")
  });

  test("should display an error for more than 8 characters of password but without any lowecase letters", async ({
    page,
  }) => {
    await page.goto(${SIGN_IN_UR});

    const password = page.getByTestId("password");
    await password.fill("1111111");

    await page.getByRole("button", { name: "Login" }).click();

    const passwordErrorMessage = await page
      .getByTestId("passwordErrorMessage")
      .textContent();

    await expect(passwordErrorMessage?.trim()).toBe("Password must include at least one lowercase letter.");
  });

  test("should display an error for more than 8 characters of password but without any uppercase letters", async ({
    page,
  }) => {
    await page.goto(${SIGN_IN_UR});

    const password = page.getByTestId("password");
    await password.fill("1111111s");

    await page.getByRole("button", { name: "Login" }).click();

    const passwordErrorMessage = await page
      .getByTestId("passwordErrorMessage")
      .textContent();

    await expect(passwordErrorMessage?.trim()).toBe("Password must include at least one uppercase letter.");
  });

  test("should display an error for but without any uppercase letters", async ({
    page,
  }) => {
    await page.goto(${SIGN_IN_UR});

    const password = page.getByTestId("password");
    await password.fill("1111111sS");

    await page.getByRole("button", { name: "Login" }).click();

    const passwordErrorMessage = await page
      .getByTestId("passwordErrorMessage")
      .textContent();

    await expect(passwordErrorMessage?.trim()).toBe("Password must include at least one special character (e.g.@, #, $,).");
  })

  test("should display an error message for invalid email(email doesn't exist on the db )", async ({
      page,
    }) => {
      await page.goto(${SIGN_IN_UR});

        const email = page.getByTestId("email");
        await email.fill("shivaji@gmail.com");

        const password = page.getByTestId("password");
        await password.fill("Test12@#");

      await page.getByRole("button", { name: "Login" }).click();

      const formErrorMessage = await page
        .getByTestId("formErrorMessage")
        .textContent();

      await expect(formErrorMessage?.trim()).toBe("Invalid email.");
  });

  test("should display an error message for invalid password(password doesn't exist on the db)", async ({
      page,
    }) => {
      await page.goto(${SIGN_IN_UR});

        const email = page.getByTestId("email");
        await email.fill("shivaji@gmail.com");

        const password = page.getByTestId("password");
        await password.fill("Test12@#");

      await page.getByRole("button", { name: "Login" }).click();

      const formErrorMessage = await page
        .getByTestId("formErrorMessage")
        .textContent();

      await expect(formErrorMessage?.trim()).toBe("Invalid email.");
  });

  test("should display home page with text :'best selling products' after completion of sucessfull sign-in", async ({
      page,
    }) => {
      await page.goto(${SIGN_IN_UR});

        const email = page.getByTestId("email");
        await email.fill("shivaji@gmail.com");

        const password = page.getByTestId("password");
        await password.fill("Test12@#");

        await page.getByRole("button", { name: "Login" }).click();

        await expect(page).toHaveURL("/")

        await expect(page).toHaveText("best selling products").toBeVisible()
  })

})