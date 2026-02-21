import { Locator, Page } from '@playwright/test';

export class MobileAppPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly todoTitle: Locator;
    readonly parentTodoDiv: Locator;
    readonly tagPushNotificationSystem: Locator;
    readonly parentInProgressDiv: Locator;
    readonly tagOfflineMode: Locator;
    readonly parentDoneDiv: Locator;
    readonly tagDesignDiv: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.locator('h1', { hasText: 'Mobile Application' });
        this.todoTitle = this.page.locator('h2', { hasText: 'To Do' });
        this.parentTodoDiv = this.page.locator("div:has-text('To Do')");
        this.tagPushNotificationSystem = this.page.locator('(//div[@class="flex flex-wrap gap-2 mb-3"])[1]');
        this.parentInProgressDiv = this.page.locator("div:has-text('In Progress')");
        this.tagOfflineMode = this.page.locator('(//div[@class="flex flex-wrap gap-2 mb-3"])[2]');
        this.parentDoneDiv = this.page.locator("div:has-text('Done')");
        this.tagDesignDiv = this.page.locator('(//div[@class="flex flex-wrap gap-2 mb-3"])[3]');
    }

    async isPageTitleVisible(): Promise<boolean> {
        console.log(`Checking visibility of page title: ${await this.pageTitle.textContent()}`);
        return await this.pageTitle.isVisible();
    }

    async isTodoTitleVisible(): Promise<boolean> {
        console.log(`Checking visibility of To Do title: ${await this.todoTitle.textContent()}`);
        return await this.todoTitle.isVisible();
    }

    async isInProgressTitleVisible(): Promise<boolean> {
        const inProgressTitle = this.page.locator('h2', { hasText: 'In Progress' });
        console.log(`Checking visibility of In Progress title: ${await inProgressTitle.textContent()}`);
        return await inProgressTitle.isVisible();
    }

    async isDoneTitleVisible(): Promise<boolean> {
        const doneTitle = this.page.locator('h2', { hasText: 'Done' });
        console.log(`Checking visibility of Done title: ${await doneTitle.textContent()}`);
        return await doneTitle.isVisible();
    }

    async getTags(tagContainer: Locator): Promise<string[]> {
        const tags = await tagContainer.locator('span').allTextContents();
        console.log('Tags found:', tags);
        return tags.map(tag => tag.trim());
    }
}