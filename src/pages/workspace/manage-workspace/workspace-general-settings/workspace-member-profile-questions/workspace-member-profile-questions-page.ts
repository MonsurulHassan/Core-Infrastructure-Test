import { WorkspaceMemberProfileQuestionsSection } from "@components/workspace/manage-workspace/workspace-member-profile-questions-section";
import { BasePage } from "@pages/base-page";
import { Locator, Page } from "@playwright/test";

export class WorkspaceMemberProfileQuestionsPage extends BasePage {
    private readonly workspaceMemberProfileQuestionsSection: Locator;

    constructor(page: Page) {
        super(page);
        this.workspaceMemberProfileQuestionsSection = page.locator("section:has(#anchor-member-fields)");
    }

    getPageId(): string {
        return "workspace-member-profile-questions";
    }

    getPageUrl(): string {
        return "/a/workspace-admin/basic-settings/member-fields";
    }

    getWorkspaceMemberProfileQuestionsSection(): WorkspaceMemberProfileQuestionsSection {
        return new WorkspaceMemberProfileQuestionsSection(
            this.page,
            this.workspaceMemberProfileQuestionsSection
        );
    }
}