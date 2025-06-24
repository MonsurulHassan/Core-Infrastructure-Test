import { Locator, Page } from "@playwright/test";

export class WorkspaceTermsOfServiceSection {
    private readonly page: Page;
    private readonly section: Locator;

    constructor(page: Page, section: Locator) {
        this.page = page;
        this.section = section
    }
}