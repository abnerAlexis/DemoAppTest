import { Page } from '@playwright/test';

export class WebApplicationPage {
    pageTitle: ReturnType<Page['locator']>;

    constructor(private page: Page) {
        this.page = page;
        this.pageTitle = this.page.locator('h1');
    }

    async isPageTitleVisible() : Promise<boolean> {
        return await this.pageTitle.isVisible();
    }
}