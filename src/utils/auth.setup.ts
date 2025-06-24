import { LoginPage } from "@pages/login-page";
import { Page, test as setup } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "node:path";

const envArg = process.env.ENV || 'local';
let envFile = 'credentials.env';
if (envArg === 'stage') envFile = 'credentials.stage.env';
else if (envArg === 'test1') envFile = 'credentials.test1.env';
else if (envArg === 'test2') envFile = 'credentials.test2.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

async function authenticateUser({
  page,
  baseUrl,
  email,
  password,
  storageStatePath,
}: {
  page: Page;
  baseUrl: string;
  email: string;
  password: string;
  storageStatePath: string;
}) {
  const loginPage = new LoginPage(page, baseUrl);
  await loginPage.goTo();
  await loginPage.login(email, password);
  await page.context().storageState({ path: storageStatePath });
}

setup("authenticate admin panel workspace admin", async ({ page }) => {
  await authenticateUser({
    page,
    baseUrl: process.env.ADMIN_PANEL_WORKSPACE_BASE_URL,
    email: process.env.ADMIN_PANEL_WORKSPACE_ADMIN_EMAIL,
    password: process.env.ADMIN_PANEL_WORKSPACE_ADMIN_PASSWORD,
    storageStatePath: ".auth/admin-panel-workspace-admin.json",
  });
});

setup("authenticate admin panel private community regular member", async ({ page }) => {
  await authenticateUser({
    page,
    baseUrl: process.env.ADMIN_PANEL_WORKSPACE_BASE_URL,
    email: process.env.ADMIN_PANEL_PRIVATE_COMMUNITY_REGULAR_MEMBER_EMAIL,
    password: process.env.ADMIN_PANEL_PRIVATE_COMMUNITY_REGULAR_MEMBER_PASSWORD,
    storageStatePath: ".auth/admin-panel-private-community-regular-member.json",
  });
});

setup("authenticate member management workspace admin", async ({ page }) => {
  await authenticateUser({
    page,
    baseUrl: process.env.MEMBER_MANAGEMENT_WORKSPACE_BASE_URL,
    email: process.env.MEMBER_MANAGEMENT_WORKSPACE_ADMIN_EMAIL,
    password: process.env.MEMBER_MANAGEMENT_WORKSPACE_ADMIN_PASSWORD,
    storageStatePath: ".auth/member-management-workspace-admin.json",
  });
});