import { BasePage } from './basePage';

export class MainPage extends BasePage {
   visit() {
      cy.visit(`/`);
   }
   get categories() {
      return cy.get(`.sidebar .menu-categories li`);
   }
}
