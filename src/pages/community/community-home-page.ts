import { BasePage } from "@pages/base-page";
import { Page } from "@playwright/test";

export class CommunityHomePage extends BasePage {
    private communityKey: string;

    constructor(page: Page, baseUrl: string, communityKey: string) {
        super(page, baseUrl);
        this.communityKey = communityKey;
    }

    async getPageId(): Promise<string> {
        return "community-home";
    }

    async getPageUrl(): Promise<string> {
        return this.baseUrl + "/c/" + this.communityKey;
    }
}