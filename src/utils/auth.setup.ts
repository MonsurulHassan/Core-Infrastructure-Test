import { LoginPage } from "@pages/login-page";
import { Page, test as setup } from "@playwright/test";
import { loadCredential } from "@utils/credentials";
import { goTo } from "@utils/navigation";
import * as dotenv from "dotenv";
import * as path from "node:path";

const envArg = process.env.ENV || 'local';
let envFile = 'credentials.env';
if (envArg === 'stage') envFile = 'credentials.stage.env';
else if (envArg === 'test1') envFile = 'credentials.test1.env';
else if (envArg === 'test2') envFile = 'credentials.test2.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

const credentialKeys = [
  "ADMIN_PANEL_WORKSPACE_ADMIN_1",
  "ADMIN_PANEL_WORKSPACE_ADMIN_2",
  "ADMIN_PANEL_WORKSPACE_PRIVATE_COMMUNITY_REGULAR_MEMBER_71",
  "ADMIN_PANEL_WORKSPACE_PUBLIC_COMMUNITY_REGULAR_MEMBER_72"
];

export function getStorageStatePath(credentialKey: string): string {
  return `.auth/${credentialKey.toLowerCase().replace(/_/g, '-')}.json`;
}

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
  const loginPage = new LoginPage(page).withBaseUrl(baseUrl);
  await goTo(loginPage);
  await loginPage.login(email, password);
  await page.context().storageState({ path: storageStatePath });
}

for (const key of credentialKeys) {
  const { baseUrl, email, password } = loadCredential(key);

  setup(`authenticate ${key.toLowerCase()}`, async ({ page }) => {
    await authenticateUser({
      page,
      baseUrl,
      email,
      password,
      storageStatePath: getStorageStatePath(key),
    });
  });
}