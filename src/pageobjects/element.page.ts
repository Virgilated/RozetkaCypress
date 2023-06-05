import { Page, Locator } from 'playwright';
import { GoodsPage } from './goods.page';
import { CartModal } from './cart.modal.page';

export class ElementPage extends GoodsPage {
  productPrice: Locator;
  productBuyButton: Locator;
  productTitle: Locator;
  cartModal: CartModal;
  constructor(page: Page) {
    super(page);
    this.cartModal = new CartModal(this.page);
    this.productPrice = page.locator(`[class*="product-price"] [class*="big"]`);
    this.productBuyButton = page.locator(
      `[class*="product-button"] [class*="buy"]`
    );
    this.productTitle = page.locator(`[class*="product__title"]`);
  }
}
