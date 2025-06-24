import { BasePage } from "@pages/base-page";
import { Page } from "@playwright/test";

export class WorkspaceHomePage extends BasePage {
  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
  }

  async getPageId(): Promise<string> {
    return "landing-page";
  }

  async getPageUrl(): Promise<string> {
    return this.baseUrl + "/c";
  }
}