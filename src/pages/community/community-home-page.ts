import { BasePage } from "@pages/base-page";
import { Page } from "@playwright/test";

export class CommunityHomePage extends BasePage {
    constructor(page: Page, baseUrl: string, communityKey: string) {
        super(page, baseUrl, communityKey);
    }

    async getPageId(): Promise<string> {
        return "community-home";
    }

    async getPageUrl(): Promise<string> {
        return this.baseUrl + "/c/" + this.communityKey;
    }
}