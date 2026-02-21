import test, { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { MobileAppPage } from "../pages/MobileAppPage";
import { WebAppPage } from "../pages/WebAppPage";

test.describe('Mobile Application Page Tests', () => {
    let loginPage: LoginPage;
    let webAppPage: WebAppPage;
    let mobileAppPage: MobileAppPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        webAppPage = new WebAppPage(page);
        mobileAppPage = new MobileAppPage(page);
        await page.goto(process.env.BASE_URL || '');
        await loginPage.login(process.env.USERNAME || '', process.env.PASSWORD || '');
        expect(await webAppPage.isPageTitleVisible()).toBeTruthy();
        await page.click('button:has-text("Mobile Application")');
    });

    // Test Case 4: Navigate to "Mobile Application."
    test('should display the Mobile Application page title after login', async ({ page }) => {
        const mobileAppPage = new MobileAppPage(page);
        const isTitleVisible = await mobileAppPage.isPageTitleVisible();
        expect(isTitleVisible).toBeTruthy();
    });

    // Verify To Do Column - Verify the visibility of the title "To Do"
    test('should display the To Do title on the Mobile Application page', async ({ page }) => {
        const isTodoTitleVisible = await mobileAppPage.isTodoTitleVisible();
        expect(isTodoTitleVisible).toBeTruthy();
    });
    
    // Test Case 4: Verify "Push notification system" is in the "To Do" column.
    test('should display the "Push notification system" task in the "To Do" column', async () => {
        await expect(mobileAppPage.parentTodoDiv.locator('h3', { hasText: 'Push notification system' })).toBeVisible();
    });

    // Test Case 4: Confirm tags: "Feature” of Push notification system task.
    test('should display "Feature" tag for the "Push notification system task', async () => {
        const tags = await mobileAppPage.getTags(mobileAppPage.tagPushNotificationSystem);
        expect(tags).toContain('Feature');
    })
});