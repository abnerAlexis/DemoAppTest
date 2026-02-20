import {Locator, Page} from '@playwright/test';

export class MobileAppPage{
    readonly page: Page;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.locator('h1', { hasText: 'Mobile Application' });
    }

    async isPageTitleVisible(): Promise<boolean> {
        console.log(`Checking visibility of page title: ${await this.pageTitle.textContent()}`);
        return await this.pageTitle.isVisible();
    }
}