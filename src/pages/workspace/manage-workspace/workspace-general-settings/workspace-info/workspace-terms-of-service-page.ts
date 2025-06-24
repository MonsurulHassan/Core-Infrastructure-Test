import { Page } from "@playwright/test";
import { WorkspaceInfoPage } from "@pages/workspace/manage-workspace/workspace-general-settings/workspace-info/workspace-info-page";

export class WorkspaceTermsOfServicePage extends WorkspaceInfoPage {
    constructor(page: Page, baseUrl: string) {
        super(page, baseUrl);
    } 

    async getPageUrl(): Promise<string> {
        return (await super.getPageUrl()).concat("#anchor-settings-global-workspace-tos");
    }  
}