import { CartModal } from './cart.modal.page';
import { BannerModal } from './banner.modal';

export class BasePage {

   get cartModal() {
      return new CartModal();
   }

   get numberOfGoodsInCart() {
      return cy.get(`[class*="cart"] [class*="badge"]`);
   }

   get headerCartButton() {
      return cy.get(`[class*="header"] [class*="cart"] button`);
   }

   get headerAccountButton() {
      return cy.get(`[class*="header"] [class*="user"] button`);
   }

   getNormalizedTitle(title) {
      if (title.includes(`+`)) {
         return title.split(` +`)[0].trim();
      }
      return title.trim();
   }

   getNormalizedAmount(numbers) {
      return Number(numbers.replace(/\s+/g, ``).replace(`₴`, ``).trim());
   }
}
