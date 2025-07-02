import { WorkspaceInfoPage } from "@pages/workspace/manage-workspace/workspace-general-settings/workspace-info/workspace-info-page";
import { Page } from "@playwright/test";

export class WorkspaceTermsOfServicePage extends WorkspaceInfoPage {
    constructor(page: Page) {
        super(page);
    }

    getPageUrl(): string {
        return super.getPageUrl().concat("#anchor-settings-global-workspace-tos");
    }
}