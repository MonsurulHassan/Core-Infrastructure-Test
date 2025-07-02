import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
    page: Page;
    baseUrl: string;
    communityKey: string;

    constructor(page: Page) {
        this.page = page;
    }

    abstract getPageId(): string;

    abstract getPageUrl(): string;

    withBaseUrl(baseUrl: string): this {
        this.baseUrl = baseUrl;
        return this;
    }

    withCommunityKey(communityKey: string): this {
        this.communityKey = communityKey;
        return this;
    }

    async getCurrentPageId(): Promise<string> {
        await this.page.waitForLoadState('networkidle');
        const pageId = await this.page.locator("body").getAttribute("data-test-element-id");
        return pageId || "Page ID not found";
    }

    async isAtPage(): Promise<boolean> {
        const currentPageId = await this.getCurrentPageId();
        const expectedPageId = this.getPageId();
        return currentPageId === expectedPageId;
    }

    async isNotAtPage(): Promise<boolean> {
        return !(await this.isAtPage());
    }

    async acceptCookies(): Promise<void> {
        const cookieConsentModal = this.page.locator(".cookie-consent-modal");
        if (await cookieConsentModal.isVisible()) {
            await this.page.getByRole("button", { name: "Accept" }).click();
            await cookieConsentModal.waitFor({ state: "hidden" });
            await this.page.waitForLoadState('networkidle');
        }
    }

    async hasSuccessAlert(): Promise<boolean> {
        const successAlert = this.page.locator(".alert-success");
        await successAlert.waitFor({ state: 'visible' });
        return await successAlert.isVisible();
    }

    async hasErrorAlert(): Promise<boolean> {
        const errorAlert = this.page.locator(".alert-danger");
        await errorAlert.waitFor({ state: 'visible' });
        return await errorAlert.isVisible();
    }

    async getAlertMessage(): Promise<string> {
        const alert = this.page.locator(".alert");
        await alert.waitFor({ state: 'visible' });
        return await alert.textContent() || "No alert message found";
    }
}