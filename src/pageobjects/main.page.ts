import { Page, Locator } from 'playwright';
import { BasePage } from './basePage';

export class MainPage extends BasePage {
  categories: Locator;
  numberInput: Locator;
  passwordInput: Locator;

  constructor(page: Page) {
    super(page);
    this.categories = page.locator(`sidebar .menu-categories li`);
    this.numberInput = page.locator(`#auth_email`);
    this.passwordInput = page.locator(`#auth_pass`);
  }

  async goToMainPage() {
    await this.page.goto(`https://rozetka.com.ua/ua/`);
  }
}
