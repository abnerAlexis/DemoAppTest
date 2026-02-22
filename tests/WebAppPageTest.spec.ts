import { test, expect } from '@playwright/test';
import { WebAppPage } from '../pages/WebAppPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Web Application Page Tests', () => {
  let webAppPage: WebAppPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    webAppPage = new WebAppPage(page);
    await loginPage.login();
  });

  // Comfirm successful login by checking page title 'Web Application' visibility.
  test('should display the Web Application page title after login', async () => {
    const isTitleVisible = await webAppPage.isPageTitleVisible();
    expect(isTitleVisible).toBeTruthy();
  });

  // To Do Column - Verify the visibility of the title "To Do"
  test('should display the To Do title on the Web Application page', async () => {
    const isTodoTitleVisible = await webAppPage.isTodoTitleVisible();
    expect(isTodoTitleVisible).toBeTruthy();
  });

  // Test Case 1 - Verify "Implement user authentication" is in the "To Do" column
  test('should display the "Implement user authentication" task in the "To Do" column', async () => {
    await expect(webAppPage.parentTodoDiv.locator('h3', { hasText: 'Implement user authentication' })).toBeVisible();
  });

  // Test Case 1 - Confirm tags: "Feature" and "High Priority”
  test('should display "Feature" and "High Priority" tags for the task', async () => {
    const tags = await webAppPage.getTags(webAppPage.tagImplementUserAuth);
    expect(tags).toContain('Feature');
    expect(tags).toContain('High Priority');
  });

  // Test Case 2 - Verify "Fix navigation bug" is in the "To Do" column
  test('should display "Fix navigation bug" task in the "To Do" column', async () => {
    const taskDiv = webAppPage.parentTodoDiv.locator('h3', {
      hasText: 'Fix navigation bug'
    });
    await expect(taskDiv).toBeVisible();
  });

  // Test Case 2 - Confirm tags: "Bug”
  test('should display "Bug" tag for the "Fix navigation bug" task', async () => {
    const tags = await webAppPage.getTags(webAppPage.tagFixNavBug);
    expect(tags).toContain('Bug');
  });

  // Verify "In Progress" title is visible.
  test('should display the "In Progress" title on the Web Application page', async () => {
    const isInProgressTitleVisible = await webAppPage.isInProgressTitleVisible();
    expect(isInProgressTitleVisible).toBeTruthy();
  });

  //Test Case 3 - Verify "Design system updates" is in the "In Progress" column
  test('should display the "Design system updates" task in the "In Progress" column', async () => {
    await expect(webAppPage.parentInProgressDiv.locator('h3', { hasText: 'Design system updates' })).toBeVisible();
  });

  // Test Case 3 - Confirm tags: "Design”
  test('should display "Design" tag for the "Design system updates" task', async () => {
    const tags = await webAppPage.getTags(webAppPage.tagDesign);
    expect(tags).toContain('Design');
  });
}); 