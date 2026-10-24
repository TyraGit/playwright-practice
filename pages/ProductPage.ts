import { Page, Locator } from "@playwright/test";

export class ProductsPage {
    readonly page: Page;
    readonly title: Locator;
    readonly addBackPackButton: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.addBackPackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async addBackpackToCart() {
        await this.addBackPackButton.click();
    }

    async openCart() {
        await this.cartLink.click();
    }
}