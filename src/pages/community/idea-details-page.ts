import { BasePage } from "@pages/base-page";
import { Page } from "@playwright/test";

export class IdeaDetailsPage extends BasePage {
    private ideaId: number;

    constructor(page: Page) {
        super(page);
    }

    getPageId(): string {
        return "idea-details";
    }

    getPageUrl(): string {
        return this.baseUrl + "/c/" + this.communityKey + "/idea/" + this.ideaId;
    }

    withIdeaId(ideaId: number): this {
        this.ideaId = ideaId;
        return this;
    }
}