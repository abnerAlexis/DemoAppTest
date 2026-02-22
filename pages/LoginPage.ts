import { Locator, Page } from '@playwright/test';
import Config from '../commons/config';

export class LoginPage {
  readonly page: Page;
  readonly config: Config;
  readonly pageTitle: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.config = new Config();
    this.pageTitle = this.page.locator('h1', { hasText: 'Web Application' })
    this.usernameInput = this.page.locator('input[id="username"]');
    this.passwordInput = this.page.locator('input[id="password"]');
    this.loginButton = this.page.locator("button[type='submit']");
    this.errorMessage = this.page.locator('//div[@class="text-red-500 text-sm"]');
  }

  async login() {
    await this.page.goto(this.config.baseUrl);
    await this.usernameInput.fill(this.config.username);
    await this.passwordInput.fill(this.config.password);
    await this.loginButton.click();
  }

  async loginByCredentials(username: string, password: string) {
    await this.page.goto(this.config.baseUrl);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}