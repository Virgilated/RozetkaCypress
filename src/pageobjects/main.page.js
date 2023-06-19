import { BasePage } from './basePage';

export class MainPage extends BasePage {
   visit() {
      cy.visit(`https://rozetka.com.ua/ua/`);
   }
   get categories() {
      return cy.get(`.sidebar .menu-categories li`);
   }
}
