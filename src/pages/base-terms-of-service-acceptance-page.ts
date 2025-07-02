import { Checkbox } from "@components/checkbox";
import { Check } from "@enums/check";
import { BasePage } from "@pages/base-page";
import { Locator, Page } from "@playwright/test";

export abstract class BaseTermsOfServiceAcceptancePage extends BasePage {
    protected confirmButton: Locator;

    constructor(page: Page) {
        super(page);
        this.confirmButton = this.page.getByRole("button", { name: "Confirm" });
    }

    abstract getPageId(): string;

    abstract getPageUrl(): string;

    abstract clickConfirmButton(): Promise<void>;

    async acceptTermsOfService(pageInstance: BaseTermsOfServiceAcceptancePage): Promise<BaseTermsOfServiceAcceptancePage> {
        const checkbox = this.page.locator('#terms-field');
        new Checkbox(this.page, checkbox).checkboxState(Check.CHECK);
        return pageInstance;
    }
}