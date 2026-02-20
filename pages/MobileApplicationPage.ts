import {Locator, Page} from '@playwright/test';

export class MobileApplicationPage{
    readonly page: Page;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.locator('h1', { hasText: 'Mobile Application' });
    }

    async isPageTitleVisible(): Promise<boolean> {
        return await this.pageTitle.isVisible();
    }
}