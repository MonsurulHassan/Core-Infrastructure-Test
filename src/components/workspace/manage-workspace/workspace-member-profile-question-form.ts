import { Switch } from "@components/switch";
import { CustomFieldInputType } from "@enums/custom-field-input-type";
import { Toggle } from "@enums/toggle";
import { WorkspaceMemberProfileQuestionsPage } from "@pages/workspace/manage-workspace/workspace-general-settings/workspace-member-profile-questions/workspace-member-profile-questions-page";
import { Locator, Page } from "@playwright/test";

export class WorkspaceMemberProfileQuestionForm {
    private readonly page: Page;
    private readonly form: Locator;

    constructor(page: Page, form: Locator) {
        this.page = page;
        this.form = form;
    }

    async fillLabel(label: string): Promise<WorkspaceMemberProfileQuestionForm> {
        await this.form.locator("#custom-field-value").fill(label);
        return this;
    }

    async fillFieldKey(label: string): Promise<WorkspaceMemberProfileQuestionForm> {
        const fieldKey = this.form.locator("#custom-field-key");
        await fieldKey.click();
        if (await fieldKey.inputValue() === "") {
            await fieldKey.fill(label.trim().toLowerCase().replace(/\s+/g, '_'));
        }
        return this;
    }

    async fillUserInstructions(userInstructions: string): Promise<WorkspaceMemberProfileQuestionForm> {
        await this.form.locator('.ql-editor').fill(userInstructions);
        return this;
    }

    async selectFieldType(fieldType: CustomFieldInputType): Promise<WorkspaceMemberProfileQuestionForm> {
        await this.form.getByRole('combobox', { name: 'Select--' }).click();
        await this.page.locator('.select2-search__field').click();
        await this.page.locator('.select2-search__field').fill(fieldType);
        await this.page.getByRole('option', { name: fieldType }).click();
        await this.page.locator('.select2-results').waitFor({ state: 'hidden' });
        return this;
    }

    async toggleShowOnRegistrationFormSwitch(toggle: Toggle): Promise<WorkspaceMemberProfileQuestionForm> {
        const switchLocator = this.form.locator('#custom-field-option-for-signup');
        new Switch(this.page, switchLocator).switchState(toggle);
        return this;
    }

    async toggleRequiredSwitch(toggle: Toggle): Promise<WorkspaceMemberProfileQuestionForm> {
        const switchLocator = this.form.locator('#custom-field-option-required');
        new Switch(this.page, switchLocator).switchState(toggle);
        return this;
    }

    async clickSubmitButton(): Promise<void> {
        await this.form.locator("[name='edit-user-custom-field']").click();
        const workspaceMemberProfileQuestionsPage = new WorkspaceMemberProfileQuestionsPage(this.page);
        await workspaceMemberProfileQuestionsPage.isAtPage();
        await workspaceMemberProfileQuestionsPage.hasSuccessAlert();
    }
}