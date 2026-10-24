import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly title: Locator;
    readonly thankYouMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.thankYouMessage = page.locator('[data-test="complete-header"]');
    }
}