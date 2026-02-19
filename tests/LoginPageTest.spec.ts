import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL || '');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(process.env.USERNAME || '', process.env.PASSWORD || '');
    // Test Case 1 - Verifying successful login by checking page title 'Web Application' visibility.
    const pageHeader = page.locator('h1', { hasText: 'Web Application' });
    await expect(pageHeader).toBeVisible();
  });
});
