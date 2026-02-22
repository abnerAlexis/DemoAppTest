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
    const env = loginData.envName as 'staging' | 'production' | 'development';
    const credentials = loginData[env];

    baseURL = credentials.baseURL;
    username = credentials.username;
    password = credentials.password;
  });

  test('User should be able to login with valid credentials', async ({ page }) => {
    await page.goto(baseURL);
    await loginPage.login(username, password);
    await expect(loginPage.pageTitle).toBeVisible();
  })
});