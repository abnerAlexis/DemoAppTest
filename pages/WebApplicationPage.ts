import { expect, Locator, Page } from '@playwright/test';

export class WebApplicationPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly todoTitle: Locator;
    readonly parentTodoDiv: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.locator('h1', { hasText: 'Web Application' });
        this.todoTitle = this.page.locator('h2', { hasText: 'To Do' });
        this.parentTodoDiv = this.page.locator("div:has-text('To Do')");
    }

    async isPageTitleVisible(): Promise<boolean> {
        return await this.pageTitle.isVisible();
    }

    async isTodoTitleVisible(): Promise<boolean> {
        return await this.todoTitle.isVisible();
    }

    // Task Case 1 - Retrieving all contents in task container to confirm tags "Feature" "High Priority”
    async getContentsOfTasks() {
        const taskDiv = this.parentTodoDiv.locator('div', {
            hasText: 'Implement user authentication'
        });

        // console.log('Task Contents:', await taskDiv.count());

        const tags = await taskDiv.locator('span').allTextContents();
        return tags;
    }
}