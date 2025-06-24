import { Page } from "@playwright/test";
import { BasePage } from "@pages/base-page";
import { Checkbox } from "@components/checkbox";
import { Check } from "@enums/check";

export abstract class BaseTermsOfServiceAcceptancePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    abstract getPageId(): Promise<string>;

    abstract getPageUrl(): Promise<string>;

    async acceptTermsOfService<T extends BaseTermsOfServiceAcceptancePage>(page: new (page: Page) => T): Promise<T> {
        const checkbox = this.page.locator('#terms-field');
        new Checkbox(this.page, checkbox).checkboxState(Check.CHECK);
        return new page(this.page);
    }

    async clickConfirmButton(): Promise<void> {
        const confirmButton = this.page.getByRole("button", { name: "Confirm" });
        await confirmButton.waitFor({ state: "visible" })
        await confirmButton.click();
        await Promise.race([
            this.page.getByTestId("landing-page").waitFor({ state: "visible" }),
            this.page.getByTestId("community-tos").waitFor({ state: "visible" }),
            this.page.getByTestId("community-home").waitFor({ state: "visible" }),
            this.page.getByTestId("campaign-home").waitFor({ state: "visible" })
        ]);
    }
}