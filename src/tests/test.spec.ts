import { test } from "@fixtures/page-fixtures";
import { expect } from "@playwright/test";
import { currentCredential } from "@utils/credential-context";

const WORKSPACE_ADMIN_1 = 'ADMIN_PANEL_WORKSPACE_ADMIN_1';
const WORKSPACE_ADMIN_2 = 'ADMIN_PANEL_WORKSPACE_ADMIN_2';
const PRIVATE_COMMUNITY_REGULAR_MEMBER_71 = 'ADMIN_PANEL_WORKSPACE_PRIVATE_COMMUNITY_REGULAR_MEMBER_71';
const PUBLIC_COMMUNITY_REGULAR_MEMBER_72 = 'ADMIN_PANEL_WORKSPACE_PUBLIC_COMMUNITY_REGULAR_MEMBER_72';

test.describe("smoke", () => {
  test('should log in to workspace and community home pages', async ({
    workspaceHomePageWithAuth,
    communityHomePageWithAuth
  }) => {
    let workspaceHomePage = await workspaceHomePageWithAuth(WORKSPACE_ADMIN_1);
    await workspaceHomePage.goTo();
    expect(await workspaceHomePage.isAtPage()).toBeTruthy();

    let communityHomePage = await communityHomePageWithAuth(currentCredential());
    await communityHomePage.goTo();
    expect(await communityHomePage.isAtPage()).toBeTruthy();

    workspaceHomePage = await workspaceHomePageWithAuth(PRIVATE_COMMUNITY_REGULAR_MEMBER_71);
    await workspaceHomePage.goTo();
    expect(await workspaceHomePage.isAtPage()).toBeTruthy();

    communityHomePage = await communityHomePageWithAuth(currentCredential());
    await communityHomePage.goTo();
    expect(await communityHomePage.isAtPage()).toBeTruthy();
  });
});

test.describe("admin-panel", () => {
  test('should go to workspace info page', async ({
    workspaceInfoPageWithAuth
  }) => {
    let workspaceInfoPage = await workspaceInfoPageWithAuth(WORKSPACE_ADMIN_2);
    await workspaceInfoPage.goTo();
    expect(await workspaceInfoPage.isAtPage()).toBeTruthy();
  });
});