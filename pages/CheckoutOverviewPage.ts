import { Page, Locator } from "@playwright/test";

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly title: Locator;
  readonly itemName: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async finish() {
    await this.finishButton.click();
  }
}
