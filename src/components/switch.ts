import { Toggle } from "@enums/toggle";
import { expect, Locator, Page } from "@playwright/test";

export class Switch {
    private readonly page: Page;
    private readonly switch: Locator;

    constructor(page: Page, switchLocator: Locator) {
        this.page = page;
        this.switch = switchLocator;
    }

    private async turnOn() {
        if (!await this.switch.isChecked()) {
            await this.switch.locator('+ label').click({ force: true });
            await expect(this.switch).toBeChecked();
        }
    }

    private async turnOff() {
        if (await this.switch.isChecked()) {
            await this.switch.locator('+ label').click({ force: true });
            await expect(this.switch).not.toBeChecked();
        }
    }

    async switchState(toggle: Toggle): Promise<void> {
        if (toggle === Toggle.ON) {
            await this.turnOn();
        } else if (toggle === Toggle.OFF) {
            await this.turnOff();
        }
    }
}