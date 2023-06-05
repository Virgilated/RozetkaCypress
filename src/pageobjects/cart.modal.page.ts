import { Page, Locator } from 'playwright';

export class CartModal {
  sumPrice: Locator;
  closeModalButton: Locator;
  page: Page;
  constructor(page: Page) {
    this.page = page;
    this.sumPrice = page.locator(`[class*="sum-price"]`);
    this.closeModalButton = page.locator(`[class*="modal__close"]`);
  }
}
