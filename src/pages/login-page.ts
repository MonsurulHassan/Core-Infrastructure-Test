import { BasePage } from "@pages/base-page";
import { CommunityHomePage } from "@pages/community/community-home-page";
import { CommunityTermsOfServiceAcceptancePage } from "@pages/community/community-terms-of-service-acceptance-page";
import { WorkspaceHomePage } from "@pages/workspace/workspace-home-page";
import { WorkspaceTermsOfServiceAcceptancePage } from "@pages/workspace/workspace-terms-of-service-acceptance-page";
import { Page } from "@playwright/test";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getPageId(): string {
    return "login-page";
  }

  getPageUrl(): string {
    return this.baseUrl + "/a/workspace/login";
  }

  async fillEmail(email: string): Promise<void> {
    const emailField = this.page.getByRole("textbox", { name: "Email" });
    await emailField.click();
    await emailField.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    const passwordField = this.page.getByRole("textbox", { name: "Password" });
    await passwordField.click();
    await passwordField.fill(password);
  }

  async login(email: string, password: string): Promise<void> {
    await this.acceptCookies();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.page.getByRole("button", { name: "Log in" }).click();

    const workspaceTermsOfServiceAcceptancePage = new WorkspaceTermsOfServiceAcceptancePage(this.page);
    const workspaceHomePage = new WorkspaceHomePage(this.page);
    const communityTermsOfServiceAcceptancePage = new CommunityTermsOfServiceAcceptancePage(this.page);
    const communityHomePage = new CommunityHomePage(this.page);

    await Promise.race([
      this.page.getByTestId(workspaceTermsOfServiceAcceptancePage.getPageId()).waitFor({ state: "visible" }),
      this.page.getByTestId(workspaceHomePage.getPageId()).waitFor({ state: "visible" }),
      this.page.getByTestId(communityTermsOfServiceAcceptancePage.getPageId()).waitFor({ state: "visible" }),
      this.page.getByTestId(communityHomePage.getPageId()).waitFor({ state: "visible" })
    ]);
  }
}