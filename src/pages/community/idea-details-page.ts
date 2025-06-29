import { BasePage } from "@pages/base-page";
import { Page } from "@playwright/test";

export class IdeaDetailsPage extends BasePage {
    private communityKey: string;
    private ideaId: number;

    constructor(page: Page, baseUrl: string, communityKey: string) {
        super(page, baseUrl);
        this.communityKey = communityKey;
    }

    async getPageId(): Promise<string> {
        return "idea-details";
    }

    async getPageUrl(): Promise<string> {
        return this.baseUrl + "/c/" + this.communityKey + "/idea/" + this.ideaId;
    }

    async withIdeaId(ideaId: number): Promise<this> {
        this.ideaId = ideaId;
        return this;
    }
}