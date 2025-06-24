import { test } from "@fixtures/page-fixtures";
import { CommunityHomePage } from "@pages/community/community-home-page";
import { expect } from "@playwright/test";
import { COMMUNITY, WORKSPACE } from "config";


test.describe("smoke", () => {

  test.use({ storageState: ".auth/admin-panel-workspace-admin.json" });
  test('should login to community as workspace admin', async ({ adminPanelPrivateCommunityHomePage, adminPanelPublicCommunityHomePage }) => {
    await adminPanelPrivateCommunityHomePage.goTo();
    expect(await adminPanelPrivateCommunityHomePage.isAtPage()).toBeTruthy();

    await adminPanelPublicCommunityHomePage.goTo();
    expect(await adminPanelPublicCommunityHomePage.isAtPage()).toBeTruthy();
  });

  /* Multiple users test case */
  test('should login as both workspace admin and regular member', async ({ browser }) => {
    // Workspace Admin
    const adminContext = await browser.newContext({ storageState: '.auth/admin-panel-workspace-admin.json' });
    let page = await adminContext.newPage();

    let privateCommunityHomePage = new CommunityHomePage(page, WORKSPACE.ADMIN_PANEL, COMMUNITY.ADMIN_PANEL_PRIVATE);
    await privateCommunityHomePage.goTo();
    expect(privateCommunityHomePage.isAtPage()).toBeTruthy();

    await adminContext.close();

    // Community Regular Member
    const memberContext = await browser.newContext({ storageState: '.auth/admin-panel-private-community-regular-member.json' });
    page = await memberContext.newPage();

    privateCommunityHomePage = new CommunityHomePage(page, WORKSPACE.ADMIN_PANEL, COMMUNITY.ADMIN_PANEL_PRIVATE);
    await privateCommunityHomePage.goTo();
    expect(privateCommunityHomePage.isAtPage()).toBeTruthy();

    await memberContext.close();
  });
});