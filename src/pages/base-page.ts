import { Page } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;
    readonly baseUrl: string;

    protected constructor(page: Page, baseUrl: string) {
        this.page = page;
        this.baseUrl = baseUrl;
    }

    abstract getPageId(): Promise<string>;

    abstract getPageUrl(): Promise<string>;

    async goTo(): Promise<void> {
        await this.page.goto(await this.getPageUrl());
        await this.page.getByTestId(await this.getPageId()).waitFor({ state: "visible" });
    }

    async getCurrentPageId(): Promise<string> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');
        const pageId = await this.page.locator("body").getAttribute("data-test-element-id");
        return pageId || "Page ID not found";
    }

    async isAtPage(): Promise<boolean> {
        const currentPageId = await this.getCurrentPageId();
        const expectedPageId = await this.getPageId();
        return currentPageId === expectedPageId;
    }

    protected async acceptCookies(): Promise<void> {
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