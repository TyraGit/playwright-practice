import { Page, Locator } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addToCart(productSlug: string) {
    await this.page.locator(`[data-test="add-to-cart-${productSlug}"]`).click(); //to add products with add-to-cart-{name} locator
  }

  async openCart() {
    await this.cartLink.click();
  }

  async addAllToCart() { //to add all products
    const addButtons = this.page.locator('[data-test^="add-to-cart"]');
    await addButtons.first().waitFor();          // wait until at least one button is on the page

    const count = await addButtons.count();
    for (let i = 0; i < count; i++) {
      await addButtons.first().click();
    }
    return count; // hand the number back to the test
  }
}
