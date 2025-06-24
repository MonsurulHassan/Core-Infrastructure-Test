import { Page } from "@playwright/test";
import { BasePage } from "@pages/base-page";

export class WorkspaceInfoPage extends BasePage {
    constructor(page: Page, baseUrl: string) {
        super(page, baseUrl);
    }

    async getPageId(): Promise<string> {
        return "workspace-info";
    }

    async getPageUrl(): Promise<string> {
        return this.baseUrl + "/a/workspace-admin/basic-settings/global";
    }  
}