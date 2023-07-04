import { MainPage } from './main.page';

export class CheckoutPage extends MainPage {
   get userChoise() {
      return cy.get(`[class*="chips"] button`);
   }

   get contactSurnameInput() {
      return cy.get(`.js-surname input`);
   }

   get contactNameInput() {
      return cy.get(`.js-name input`);
   }

   get contactEmailInput() {
      return cy.get(`.js-email input`);
   }

   get allProducts() {
      return cy.get(`[class="checkout-product"]`);
   }

   get allProductsPrices() {
      return cy.get(
         `[class*="product-price"] [class*="digit"] [class*="price"]`
      );
   }

   get allProductsTitles() {
      return cy.get(`[class*="title-product"]`);
   }

   get allProductsQuantity() {
      return cy.get(`[class*="product-quantity"] [class*="digit"]`);
   }

   get allDeliveries() {
      return cy
         .get(`.checkout-block`)
         .contains(`Доставка`)
         .parent()
         .within(() => {
            return cy.get(`li[class*="checkout-variant"]`);
         });
   }

   get deliveryChoiseButton() {
      return cy.get(
         `[class*="delivery-pickups"] [class*="dropdown-pickups"] button`
      );
   }

   get allDeliveriesPrices() {
      return cy.get(`[class*="checkout-variant"] span[class*="price"]`);
   }

   get contactRecipientThirdname() {
      return cy.get(`#recipientPatronymic`);
   }

   get contactRecipientSurname() {
      return cy.get(`#recipientSurname`);
   }

   get contactRecipientName() {
      return cy.get(`#recipientName`);
   }

   get contactRecipientPhone() {
      return cy.get(`#recipientTel`);
   }

   get totalValue() {
      return cy.get(`[class*="js-total"]  [class*="value"]`);
   }

   get submitButton() {
      return cy.get(`[type="submit"]`);
   }

   get allPaymentsMethods() {
      return cy
         .get(`.checkout-block`)
         .contains(`Оплата`)
         .parent()
         .within(() => {
            return cy.get(`li[class*="checkout-variant"]`);
         });
   }

   get allProductsSum() {
      return cy.get(`[class*="product-amount"] [class*="digit"]`);
   }

   getCheckoutProductsInfo() {
      let products = [];
      this.allProducts.each((el) => {
         let product = {};
         cy.wrap(el).within(() => {
            this.allProductsTitles.invoke(`text`).then((title) => {
               product.title = this.getNormalizedTitle(title);
            });
            this.allProductsPrices
               .first()
               .invoke(`text`)
               .then((price) => {
                  product.price = this.getNormalizedAmount(price);
               });
            this.allProductsQuantity.invoke(`text`).then((quantity) => {
               product.quantity = quantity;
            });
            this.allProductsSum.invoke(`text`).then((sum) => {
               product.sum = this.getNormalizedAmount(sum);
            });
         });
         products.push(product);
      });

      return products;
   }
}
