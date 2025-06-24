import { Check } from "@enums/check";
import { expect, Locator, Page } from "@playwright/test";

export class Checkbox {
    private readonly page: Page;
    private readonly checkbox: Locator;

    constructor(page: Page, checkbox: Locator) {
        this.page = page;
        this.checkbox = checkbox;
    }

    private async clickCheck() {
        if (!await this.checkbox.isChecked()) {
            await this.checkbox.locator('+ label').click({ force: true });
            await expect(this.checkbox).toBeChecked();
        }
    }

    private async clickUncheck() {
        if (await this.checkbox.isChecked()) {
            await this.checkbox.locator('+ label').click({ force: true });
            await expect(this.checkbox).not.toBeChecked();
        }
    }

    async checkboxState(check: Check): Promise<void> {
        if (check === Check.CHECK) {
            await this.clickCheck();
        } else if (check === Check.UNCHECK) {
            await this.clickUncheck();
        }
    }
}