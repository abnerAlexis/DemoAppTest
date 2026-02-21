import { Locator, Page } from '@playwright/test';

export class MobileAppPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly todoTitle: Locator;
    readonly parentTodoDiv: Locator;
    readonly tagPushNotificationSystem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.locator('h1', { hasText: 'Mobile Application' });
        this.todoTitle = this.page.locator('h2', { hasText: 'To Do' });
        this.parentTodoDiv = this.page.locator("div:has-text('To Do')");
        this.tagPushNotificationSystem = this.page.locator('(//div[@class="flex flex-wrap gap-2 mb-3"])[1]');
    }

    async isPageTitleVisible(): Promise<boolean> {
        console.log(`Checking visibility of page title: ${await this.pageTitle.textContent()}`);
        return await this.pageTitle.isVisible();
    }

    async isTodoTitleVisible(): Promise<boolean> {
        console.log(`Checking visibility of To Do title: ${await this.todoTitle.textContent()}`);
        return await this.todoTitle.isVisible();
    }
}