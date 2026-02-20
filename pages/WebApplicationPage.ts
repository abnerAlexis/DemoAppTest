import { expect, Locator, Page } from '@playwright/test';

export class WebApplicationPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly todoTitle: Locator;
    readonly parentTodoDiv: Locator;
    readonly parentInProgressDiv: Locator;
    readonly tagImplementUserAuth: Locator;
    readonly tagFixNavBug: Locator;
    readonly tagDesign: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.locator('h1', { hasText: 'Web Application' });
        this.todoTitle = this.page.locator('h2', { hasText: 'To Do' });
        this.parentTodoDiv = this.page.locator("div:has-text('To Do')");
        this.parentInProgressDiv = this.page.locator("div:has-text('In Progress')");
        this.tagImplementUserAuth = this.page.locator('(//div[@class="flex flex-wrap gap-2 mb-3"])[1]');
        this.tagFixNavBug = this.page.locator('(//div[@class="flex flex-wrap gap-2 mb-3"])[2]');
        this.tagDesign = this.page.locator('(//div[@class="flex flex-wrap gap-2 mb-3"])[3]');
    }

    async isPageTitleVisible(): Promise<boolean> {
        return await this.pageTitle.isVisible();
    }
    // To Do Column
    async isTodoTitleVisible(): Promise<boolean> {
        return await this.todoTitle.isVisible();
    }

    async getTags(tagContainer: Locator): Promise<string[]> {
        const tags = await tagContainer.locator('span').allTextContents();
        console.log('Tags found:', tags);
        return tags.map(tag => tag.trim());
    }

    // In Progress Column
    async isInProgressTitleVisible(): Promise<boolean> {
        const inProgressTitle = this.page.locator('h2', { hasText: 'In Progress' });
        return await inProgressTitle.isVisible();
    }

}