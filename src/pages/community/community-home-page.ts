import { BasePage } from "@pages/base-page";
import { Page } from "@playwright/test";

export class CommunityHomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    getPageId(): string {
        return "community-home";
    }

    getPageUrl(): string {
        return this.baseUrl + "/c/" + this.communityKey;
    }
}