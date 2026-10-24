import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

//test.describe acts as test suite
test.describe("Cart", () => {
  let productsPage: ProductsPage;
  let cartsPage: CartPage;

  //run this before each test case
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAsStandardUser();

    productsPage = new ProductsPage(page);
    cartsPage = new CartPage(page);
  });

  //first test case
  test("user can add a product to the cart", async () => {
    await productsPage.addBackpackToCart();
    await expect(productsPage.cartBadge).toHaveText("1"); //expectation is to check the cart badge has value

    await productsPage.openCart();
    await expect(cartsPage.title).toHaveText("Your Cart"); //expectation is to verify that the page has title Your Cart
    await expect(cartsPage.itemName).toHaveText("Sauce Labs Backpack"); //expectation is to verify that item exist in the page
  });
});
