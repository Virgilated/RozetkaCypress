import { Page, Locator } from 'playwright';
import { CategoryPage } from './category.page';

export class GoodsPage extends CategoryPage {
  allItems: Locator;
  allItemsTitle: Locator;
  allItemsBuyButton: Locator;
  allItemsPrice: Locator;
  URLgoods: string;
  constructor(page: Page) {
    super(page);
    this.allItems = page.locator(`[class*="goods"]  [class*="inner"]`);
    this.allItemsTitle = page.locator(`[class*="goods"]  [class*="title"]`);
    this.allItemsBuyButton = page.locator(
      `[class*="goods"]  [class*="buy-button"]`
    );
    this.allItemsPrice = page.locator(`[class*="goods"]  [class*="value"]`);
    this.URLgoods = ``;
  }
  saveGoodsURL() {
    this.URLgoods = window.location.href;
  }
}
