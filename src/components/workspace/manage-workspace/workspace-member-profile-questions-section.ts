import { Locator, Page } from "@playwright/test";
import { WorkspaceMemberProfileQuestionForm } from "./workspace-member-profile-question-form";

export class WorkspaceMemberProfileQuestionsSection {
    private readonly page: Page;
    private readonly section: Locator;

    constructor(page: Page, section: Locator) {
        this.page = page;
        this.section = section
    }

    async clickAddMemberProfileQuestionButton(): Promise<WorkspaceMemberProfileQuestionForm> {
        await this.section.getByTestId("add-new-custom-field").click();
        await this.page.waitForLoadState("networkidle");
        return new WorkspaceMemberProfileQuestionForm(this.page, this.page.locator("form"));
    }
}