import { test } from "@fixtures/page-fixtures";
import { CommunityHomePage } from "@pages/community/community-home-page";
import { expect } from "@playwright/test";
import { COMMUNITY, WORKSPACE } from "config";


test.describe("admin-panel", () => {
  
  test.use({ storageState: ".auth/admin-panel-workspace-admin.json" });
  test('login as workspace admin in admin panel workspace', async ({ adminPanelWorkspaceHomePage, adminPanelPrivateCommunityHomePage, adminPanelPublicCommunityHomePage, page }) => {
    await adminPanelWorkspaceHomePage.goTo();
    expect(await adminPanelWorkspaceHomePage.isAtPage()).toBeTruthy();

    await adminPanelPrivateCommunityHomePage.goTo();
    expect(await adminPanelPrivateCommunityHomePage.isAtPage()).toBeTruthy();

    await adminPanelPublicCommunityHomePage.goTo();
    expect(await adminPanelPublicCommunityHomePage.isAtPage()).toBeTruthy();
  });

  /* Multiple users test case */
  test('login as workspace admin and regular member in admin panel private community', async ({ browser }) => {
    // Workspace Admin
    const adminContext = await browser.newContext({
      storageState: '.auth/admin-panel-workspace-admin.json',
    });
    let page = await adminContext.newPage();

    let adminPanelPrivateCommunityHomePage = new CommunityHomePage(page, WORKSPACE.ADMIN_PANEL, COMMUNITY.ADMIN_PANEL_PRIVATE);
    await adminPanelPrivateCommunityHomePage.goTo();
    expect(adminPanelPrivateCommunityHomePage.isAtPage()).toBeTruthy();

    await adminContext.close();

    // Community Regular Member
    const memberContext = await browser.newContext({
      storageState: '.auth/admin-panel-private-community-regular-member.json',
    });
    page = await memberContext.newPage();

    adminPanelPrivateCommunityHomePage = new CommunityHomePage(page, WORKSPACE.ADMIN_PANEL, COMMUNITY.ADMIN_PANEL_PRIVATE);
    await adminPanelPrivateCommunityHomePage.goTo();
    expect(adminPanelPrivateCommunityHomePage.isAtPage()).toBeTruthy();

    await memberContext.close();
  });
});