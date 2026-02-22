import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from './data/loginData.json';

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;
  let baseURL: string;
  let username: string;
  let password: string;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    const env = loginData.envName as 'development' | 'staging' | 'production';
    const credentials = loginData[env];

    baseURL = credentials.baseURL;
    username = credentials.username;
    password = credentials.password;
  });

  test('User should be able to login with valid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await loginPage.login(username, password);
    await expect(loginPage.pageTitle).toBeVisible();
  });

  test('User should see error message with invalid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await loginPage.login('invalidUser', 'invalidPass');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid username or password');
  });

  test('User should see validation error when username is empty', async ({ page }) => {
    await page.goto(baseURL);
    await loginPage.login('', password);
    await expect(loginPage.usernameInput).toBeFocused();
    const isInvalid = await loginPage.usernameInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true);
  });

  test('User should see validation error when password is empty', async ({ page }) => {
    await page.goto(baseURL);
    await loginPage.login(username, '');
    await expect(loginPage.passwordInput).toBeFocused();
    const isInvalid = await loginPage.passwordInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true);
  });

  test('User should see validation error when both fields are empty', async ({ page }) => {
    await page.goto(baseURL);
    await loginPage.login('', '');
    await expect(loginPage.usernameInput).toBeFocused();
    const isUsernameInvalid = await loginPage.usernameInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isUsernameInvalid).toBe(true);
  });

  test('User should see validation error message when username is empty', async ({ page }) => {
    await page.goto(baseURL);
    await loginPage.login('', password);
    const validationMessage
      = await loginPage.usernameInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toMatch(/fill.*field|fill.*form/i);
  });

  test('User should see validation error message when password is empty', async ({ page }) => {
    await page.goto(baseURL);
    await loginPage.login(username, '');
    const validationMessage
      = await loginPage.passwordInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toMatch(/fill.*field|fill.*form/i);
  });
});