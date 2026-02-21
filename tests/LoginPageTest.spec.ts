import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from './data/loginData.json';

test.describe('Login', () => {
  for (const { scenario, username, password, expectSuccess, errorType, expectedError } of loginData) {
    test(`${scenario}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto(process.env.BASE_URL || '');
      await loginPage.login(username, password);

      if (expectSuccess) {
        await expect(loginPage.pageTitle).toBeVisible();
      } else if (errorType === 'html5') {
        const emptyField = username === ''
          ? loginPage.usernameInput
          : loginPage.passwordInput;

        const isInvalid = await emptyField.evaluate(
          (el: HTMLInputElement) => !el.validity.valid
        );
        expect(isInvalid).toBe(true);
      } else {
        await expect(loginPage.errorMessage).toContainText(expectedError!);
      }
    });
  }
});