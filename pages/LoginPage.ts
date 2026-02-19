import { Page } from '@playwright/test';

//   errorMessage: ".error-message"

export class LoginPage {
  usernameInput: ReturnType<Page['locator']>;
  passwordInput: ReturnType<Page['locator']>;
  loginButton: ReturnType<Page['locator']>;

  constructor(private page: Page) {
    this.usernameInput = this.page.locator('input[id="username"]');
    this.passwordInput = this.page.locator('input[id="password"]');
    this.loginButton = this.page.locator("button[type='submit']");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}