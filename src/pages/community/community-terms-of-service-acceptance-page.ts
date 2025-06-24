import { BaseTermsOfServiceAcceptancePage } from "@pages/base-terms-of-service-acceptance-page";
import { Page } from "@playwright/test";

export class CommunityTermsOfServiceAcceptancePage extends BaseTermsOfServiceAcceptancePage {
    private readonly communityKey: string;

    constructor(page: Page) {
        super(page);
        this.communityKey = process.env.COMMUNITY_KEY;
    }

    async getPageId(): Promise<string> {
        return "community-tos";
    }

    async getPageUrl(): Promise<string> {
        return `/c/${this.communityKey}/membership/tos`;
    }
}