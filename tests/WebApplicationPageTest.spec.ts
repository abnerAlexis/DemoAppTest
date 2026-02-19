import { test, expect } from '@playwright/test';
import { WebApplicationPage } from '../pages/WebApplicationPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Web Application Page Tests', () => {
  let webAppPage: WebApplicationPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    webAppPage = new WebApplicationPage(page);
    await page.goto(process.env.BASE_URL || '');
    await loginPage.login(process.env.USERNAME || '', process.env.PASSWORD || '');
  });

   test('should display the Web Application page title after login', async () => {
      const isTitleVisible = await webAppPage.isPageTitleVisible();
      expect(isTitleVisible).toBeTruthy();
   });

   // Task Case 1 - Verify "Implement user authentication" is in the "To Do" column
   test('should display the To Do title on the Web Application page', async () => {
      await expect(webAppPage.parentTodoDiv.locator('h3', { hasText: 'Implement user authentication' })).toBeVisible();
   });

   // Task Case 1 - Confirm tags: "Feature" "High Priority”
    test('should display the correct tags for the task', async () => {
        const tags = await webAppPage.getContentsOfTasks();
        expect(tags).toContain('Feature');
        expect(tags).toContain('High Priority');
    });

    test('should display "Fix navigation bug" task in the "To Do" column', async () => {
        const taskDiv = webAppPage.parentTodoDiv.locator('h3', {
            hasText: 'Fix navigation bug'
        });
        await expect(taskDiv).toBeVisible();
    });
}); 