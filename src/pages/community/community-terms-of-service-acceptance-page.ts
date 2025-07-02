import { BaseTermsOfServiceAcceptancePage } from "@pages/base-terms-of-service-acceptance-page";
import { expect, Page } from "@playwright/test";

export class CommunityTermsOfServiceAcceptancePage extends BaseTermsOfServiceAcceptancePage {
    constructor(page: Page) {
        super(page);
    }

    getPageId(): string {
        return "community-tos";
    }

    getPageUrl(): string {
        return "/c/" + this.communityKey + "/membership/tos";
    }

    async clickConfirmButton(): Promise<void> {
            await this.confirmButton.waitFor({ state: "visible" });
            await this.confirmButton.click();
            await expect.poll(() => this.isNotAtPage()).toBe(true);
    }
}