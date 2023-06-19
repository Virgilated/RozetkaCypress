import { MainPage } from './main.page';

export class CategoryPage extends MainPage {
   get allItemsCategories() {
      return cy.get(`[class*="cell"] [class*="item"] a`);
   }

   get allCategoriesBlocksHeaders() {
      return cy.get(`[class*="grid"] [class*="cell"] [class*="heading"]`);
   }

   get header() {
      return cy.get(`h1[class*="heading"]`);
   }

   clickOnRandomGroup() {
      this.allCategoriesBlocksHeaders
         .its(`length`)
         .then((length) => {
            return Math.floor(Math.random() * length);
         })
         .then((randomElement) => {
            this.allCategoriesBlocksHeaders.eq(randomElement).click();
         })
         .then(() => {
            this.header
               .invoke(`text`)
               .as(`headerText`)
               .then((textContent) => {
                  if (
                     textContent === `Серверне обладнання` ||
                     textContent === 'Товари для геймерів'
                  ) {
                     this.allCategoriesBlocksHeaders
                        .its(`length`)
                        .then((length) => {
                           return Math.floor(Math.random() * length);
                        })
                        .then((randomElement) => {
                           this.allCategoriesBlocksHeaders
                              .eq(randomElement)
                              .click();
                        });
                  }
               });
         })
         .then(() => {
            cy.get(`@headerText`).then((text) => {
               if (
                  text === 'Атрибутика і сувеніри для геймерів' ||
                  text === `Комплектуючі для геймерів` ||
                  text === `Ігрова периферія`
               ) {
                  this.allCategoriesBlocksHeaders
                     .its(`length`)
                     .then((length) => {
                        return Math.floor(Math.random() * length);
                     })
                     .then((randomElement) => {
                        this.allCategoriesBlocksHeaders
                           .eq(randomElement)
                           .click();
                     });
               }
            });
         });
   }
}
