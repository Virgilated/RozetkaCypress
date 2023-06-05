import { Page, Locator } from 'playwright';
import { MainPage } from './main.page';

export class CategoryPage extends MainPage {
  allItemsCategories: Locator;
  constructor(page: Page) {
    super(page);
    this.allItemsCategories = page.locator(`[class*="cell"] [class*="item"]`);
  }
}
