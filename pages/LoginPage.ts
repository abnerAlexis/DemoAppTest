import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = this.page.locator('h1', { hasText: 'Web Application' })
    this.usernameInput = this.page.locator('input[id="username"]');
    this.passwordInput = this.page.locator('input[id="password"]');
    this.loginButton = this.page.locator("button[type='submit']");
  }
  // Test Case 1: Login to Demo App
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}