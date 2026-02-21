import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL || '');
  });

  // Test Case 1: Login to Demo App, verify the visibility of the title "Web Application"
  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(process.env.USERNAME || '', process.env.PASSWORD || '');
    const pageHeader = loginPage.pageTitle;
    await expect(pageHeader).toBeVisible();
  });
});
