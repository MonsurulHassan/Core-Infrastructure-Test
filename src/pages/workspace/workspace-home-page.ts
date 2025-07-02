import { BasePage } from "@pages/base-page";
import { Page } from "@playwright/test";

export class WorkspaceHomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getPageId(): string {
    return "landing-page";
  }

  getPageUrl(): string {
    return this.baseUrl + "/c";
  }
}