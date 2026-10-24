import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

test.describe("Checkout", () => {
  let checkoutPage: CheckoutPage; //declare this here if any test uses it
  let checkoutOverviewPage: CheckoutOverviewPage; //declare this here if any test uses it
  let checkoutCompletePage: CheckoutCompletePage; //declare this here if any test uses it
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.loginAsStandardUser();
    await productsPage.addToCart("sauce-labs-backpack");
    await productsPage.openCart();
    await cartPage.checkout();

    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  //1st test case
  test("shows an error when the first name is missing", async () => {
    /*await page.locator('[data-test="firstName"]').fill('');
        await page.locator('[data-test="lastName"]').fill('Ciku');
        await page.locator('[data-test="postalCode"]').fill('12345');
        await page.locator('[data-test="continue"]').click();*/
    await checkoutPage.fillShippingInfo("", "Ciku", "12345"); //use fillShippingInfo from CheckoutPage
    await checkoutPage.clickContinue(); //use clickContinue from CheckoutPage

    await expect(checkoutPage.errorMessage).toHaveText(
      "Error: First Name is required",
    );
  });

  //2nd test case
  test("user can complete an order", async () => {
    await checkoutPage.fillShippingInfo("Tembikai", "Ciku", "12345"); //use fillShippingInfo from CheckoutPage
    await checkoutPage.clickContinue(); //use clickContinue from CheckoutPage

    await expect(checkoutOverviewPage.title).toBeVisible();
    await expect(checkoutOverviewPage.itemName).toHaveText(
      "Sauce Labs Backpack",
    );

    await checkoutOverviewPage.finish();

    await expect(checkoutOverviewPage.title).toHaveText("Checkout: Overview");
    await expect(checkoutCompletePage.title).toHaveText("Checkout: Complete!");
    await expect(checkoutCompletePage.thankYouMessage).toHaveText(
      "Thank you for your order!",
    );
  });
});
