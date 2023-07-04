import { BasePage } from './basePage';

export class MainPage extends BasePage {
   visit() {
      cy.visit(`/`, {
         headers: {
            'user-agent':
               'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
         },
      });
   }
   get categories() {
      return cy.get(`.sidebar .menu-categories li`);
   }
}
