import { BasePage } from "@pages/base-page";
import { Page } from "@playwright/test";

export class LoginPage extends BasePage {
  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
  }

  async getPageId(): Promise<string> {
    return "login-page";
  }

  async getPageUrl(): Promise<string> {
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

    await Promise.race([
      this.page.getByTestId("landing-page").waitFor({ state: "visible" }),
      this.page.getByTestId("community-home").waitFor({ state: "visible" }),
    ]);

    // if (await workspaceTermsOfServiceAcceptancePage.isAtPage()) {
    //   await (await workspaceTermsOfServiceAcceptancePage
    //     .acceptTermsOfService(WorkspaceTermsOfServiceAcceptancePage))
    //     .clickConfirmButton();
    // }

    // if (await communityTermsOfServiceAcceptancePage.isAtPage()) {
    //   await (await communityTermsOfServiceAcceptancePage
    //     .acceptTermsOfService(CommunityTermsOfServiceAcceptancePage))
    //     .clickConfirmButton();
    // }
  }
}