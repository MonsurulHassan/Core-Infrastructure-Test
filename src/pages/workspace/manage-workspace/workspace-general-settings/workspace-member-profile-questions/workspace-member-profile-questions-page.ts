import { WorkspaceMemberProfileQuestionsSection } from "@components/workspace/manage-workspace/workspace-member-profile-questions-section";
import { BasePage } from "@pages/base-page";
import { Locator, Page } from "@playwright/test";

export class WorkspaceMemberProfileQuestionsPage extends BasePage {
    private readonly workspaceMemberProfileQuestionsSection: Locator;

    constructor(page: Page) {
        super(page);
        this.workspaceMemberProfileQuestionsSection = page.locator("section:has(#anchor-member-fields)");
    }

    async getPageId(): Promise<string> {
        return "workspace-member-profile-questions";
    }

    async getPageUrl(): Promise<string> {
        return "/a/workspace-admin/basic-settings/member-fields";
    }

    async goTo(): Promise<void> {
        await this.page.goto(await this.getPageUrl());
        await this.page.getByTestId(await this.getPageId()).waitFor({ state: "visible" });
    }

    async getWorkspaceMemberProfileQuestionsSection(): Promise<WorkspaceMemberProfileQuestionsSection> {
        return new WorkspaceMemberProfileQuestionsSection(
            this.page,
            this.workspaceMemberProfileQuestionsSection
        );
    }

}