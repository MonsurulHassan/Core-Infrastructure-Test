import { BasePage } from "@pages/base-page";
import { Page } from "@playwright/test";

export class WorkspaceInfoPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    getPageId(): string {
        return "workspace-info";
    }

    getPageUrl(): string {
        return this.baseUrl + "/a/workspace-admin/basic-settings/global";
    }  
}