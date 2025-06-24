import { BaseTermsOfServiceAcceptancePage } from "@pages/base-terms-of-service-acceptance-page";
import { Page } from "@playwright/test";

export class WorkspaceTermsOfServiceAcceptancePage extends BaseTermsOfServiceAcceptancePage {
    constructor(page: Page) {
        super(page);
    }

    async getPageId(): Promise<string> {
        return "workspace-tos";
    }

    async getPageUrl(): Promise<string> {
        return "/c/app/main/membership/tos";
    }
}