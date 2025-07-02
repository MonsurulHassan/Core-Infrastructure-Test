import { BaseTermsOfServiceAcceptancePage } from "@pages/base-terms-of-service-acceptance-page";
import { CommunityTermsOfServiceAcceptancePage } from "@pages/community/community-terms-of-service-acceptance-page";
import { expect, Page } from "@playwright/test";

export class WorkspaceTermsOfServiceAcceptancePage extends BaseTermsOfServiceAcceptancePage {
    constructor(page: Page) {
        super(page);
    }

    getPageId(): string {
        return "workspace-tos";
    }

    getPageUrl(): string {
        return "/c/app/main/membership/tos";
    }

    async clickConfirmButton(): Promise<void> {
        await this.confirmButton.waitFor({ state: "visible" });
        await this.confirmButton.click();
        await expect.poll(() => this.isNotAtPage()).toBe(true);

        const communityTermsOfServiceAcceptancePage = new CommunityTermsOfServiceAcceptancePage(this.page);
        if (await communityTermsOfServiceAcceptancePage.isAtPage()) {
            await (await communityTermsOfServiceAcceptancePage
                .acceptTermsOfService(communityTermsOfServiceAcceptancePage))
                .clickConfirmButton();
            await expect.poll(() => this.isNotAtPage()).toBe(true);
        }
    }
}