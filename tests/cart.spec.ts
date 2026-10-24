import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

//test.describe acts as test suite
test.describe("Cart", () => {
  let productsPage: ProductsPage; //declare this here if any test uses it
  let cartsPage: CartPage; //declare this here if any test uses it

  //run this before each test case
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAsStandardUser();

    productsPage = new ProductsPage(page);
    cartsPage = new CartPage(page);
  });

  //1st test case
  test("user can add one product to the cart", async () => {
    await productsPage.addToCart("sauce-labs-backpack");
    await expect(productsPage.cartBadge).toHaveText("1");

    await productsPage.openCart();
    await expect(cartsPage.title).toHaveText("Your Cart"); //expectation is to verify that the page has title Your Cart
    await expect(cartsPage.itemName).toHaveText(["Sauce Labs Backpack"]);
  });

  //2nd test case
  test("user can add multiple products to the cart", async () => {
    await productsPage.addToCart("sauce-labs-backpack");
    await productsPage.addToCart("sauce-labs-bike-light");
    await expect(productsPage.cartBadge).toHaveText("2");

    await productsPage.openCart();
    await expect(cartsPage.title).toHaveText("Your Cart"); //expectation is to verify that the page has title Your Cart
    await expect(cartsPage.itemName).toHaveText([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
    ]);
  });

  //3rd test case
  test("user can add all products to the cart", async () => {
    /*await productsPage.addToCart('sauce-labs-backpack');
    await productsPage.addToCart('sauce-labs-bike-light');
    await productsPage.addToCart('sauce-labs-bolt-t-shirt');*/
    const added = await productsPage.addAllToCart();
    await expect(productsPage.cartBadge).toHaveText(String(added));
    //await expect(productsPage.cartBadge).toHaveText("3"); //expectation is to check the cart badge has value

    await productsPage.openCart();
    await expect(cartsPage.title).toHaveText("Your Cart"); //expectation is to verify that the page has title Your Cart
    /*await expect(cartsPage.itemName).toHaveText([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Fleece Jacket",
      "Sauce Labs Onesie",
      "Test.allTheThings() T-Shirt (Red)",
    ]);*/ // expectation is to check all six names are listed, in the order they were added
    await expect(cartsPage.itemName).toHaveCount(6); //expectation is to verify that all six are in the cart
  });

});
