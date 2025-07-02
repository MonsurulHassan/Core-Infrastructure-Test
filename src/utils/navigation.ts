import { BasePage } from "@pages/base-page";
import { CommunityTermsOfServiceAcceptancePage } from "@pages/community/community-terms-of-service-acceptance-page";
import { WorkspaceTermsOfServiceAcceptancePage } from "@pages/workspace/workspace-terms-of-service-acceptance-page";

export async function goTo<T extends BasePage>(page: T): Promise<T> {
  await page.page.goto(page.getPageUrl());

  const workspaceTermsOfServiceAcceptancePage = new WorkspaceTermsOfServiceAcceptancePage(page.page);
  if (await workspaceTermsOfServiceAcceptancePage.isAtPage()) {
    await (await workspaceTermsOfServiceAcceptancePage
      .acceptTermsOfService(workspaceTermsOfServiceAcceptancePage))
      .clickConfirmButton();
  }
  
  const communityTermsOfServiceAcceptancePage = new CommunityTermsOfServiceAcceptancePage(page.page);
  if (await communityTermsOfServiceAcceptancePage.isAtPage()) {
    await (await communityTermsOfServiceAcceptancePage
      .acceptTermsOfService(communityTermsOfServiceAcceptancePage))
      .clickConfirmButton();
  }

  await page.page.getByTestId(page.getPageId()).waitFor({ state: "visible" });
  return page;
}
