import { CategoryPage } from './category.page';

export class GoodsPage extends CategoryPage {
   get catalog() {
      return cy.get(`.catalog`);
   }
   get allItems() {
      return cy.get(`[class*="goods"]  [class*="inner"]`);
   }
   get allItemsTitle() {
      return cy.get(`[class*="goods"]  [class*="title"]`);
   }
   get allItemsBuyButton() {
      return cy.get(`[class*="goods"]  [class*="buy-button"]`);
   }
   get allItemsPrice() {
      return cy.get(`[class*="goods"]  [class*="value"]`);
   }
   get allAvailiableButtons() {
      return cy.get(`.catalog button[aria-label="Купити"]`);
   }
   get allAvailiableSigns() {
      return cy.get(`[class*="availability--available"]`);
   }
   get innerTitle() {
      return cy.get(`[class*="title"]`);
   }
   get innerValue() {
      return cy.get(`[class*="value"]`);
   }
   get innerBuyButton() {
      return cy.get(`[class*="buy-button"]`);
   }

   getRandomProducts(quantity) {
      let myProducts = [];
      do {
         let myProduct = {};
         this.allAvailiableButtons
            .its(`length`)
            .then((length) => {
               return Math.floor(Math.random() * length);
            })
            .then((randomIndex) => {
               this.allAvailiableButtons
                  .eq(randomIndex)
                  .parents(`[class*="inner"]`)
                  .within(() => {
                     this.innerTitle.invoke(`text`).then((text) => {
                        myProduct.title = this.getNormalizedTitle(text);
                     });
                     this.innerValue.invoke(`text`).then((price) => {
                        myProduct.price = this.getNormalizedAmount(price);
                     });
                     this.innerBuyButton.click();
                     cy.wait(`@add`);
                  });
            });
         myProducts.push(myProduct);
      } while (myProducts.length < quantity);
      return myProducts;
   }
}
