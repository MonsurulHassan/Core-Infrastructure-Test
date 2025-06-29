import { BaseTermsOfServiceAcceptancePage } from "@pages/base-terms-of-service-acceptance-page";
import { Page } from "@playwright/test";

export class CommunityTermsOfServiceAcceptancePage extends BaseTermsOfServiceAcceptancePage {
    private readonly communityKey: string;

    constructor(page: Page, baseUrl: string, communityKey: string) {
        super(page, baseUrl);
        this.communityKey = communityKey;
    }

    async getPageId(): Promise<string> {
        return "community-tos";
    }

    async getPageUrl(): Promise<string> {
        return `/c/${this.communityKey}/membership/tos`;
    }
}