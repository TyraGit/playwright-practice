import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe("Checkout", () => {
    let checkoutPage: CheckoutPage; //declare this here because every test needs to use it

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.loginAsStandardUser();
        await productsPage.addToCart('sauce-labs-backpack');
        await productsPage.openCart();
        await cartPage.checkout();

        checkoutPage = new CheckoutPage(page);
    })

    //1st test case
    test('shows an error when the first name is missing', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('');
        await page.locator('[data-test="lastName"]').fill('Ciku');
        await page.locator('[data-test="postalCode"]').fill('123456');
        await page.locator('[data-test="continue"]').click();

        await expect(checkoutPage.errorMessage).toHaveText("Error: First Name is required");
    });
})