import { Page, Locator } from 'playwright';
import { CartModal } from './cart.modal.page';
export class BasePage {
  page: Page;
  cartModal: CartModal;
  numberOfGoodsInCart: Locator;
  headerCartButton: Locator;
  headerAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartModal = new CartModal(page);
    this.numberOfGoodsInCart = page.locator(`[class*="cart"] [class*="badge"]`);
    this.headerCartButton = page.locator(`[class*="cart"] button`);
    this.headerAccountButton = page.locator(`[class*="user"] button`);
  }
}
