import { BasePage } from "@pages/base-page";
import { CommunityHomePage } from "@pages/community/community-home-page";
import { IdeaDetailsPage } from "@pages/community/idea-details-page";
import { WorkspaceInfoPage } from "@pages/workspace/manage-workspace/workspace-general-settings/workspace-info/workspace-info-page";
import { WorkspaceHomePage } from "@pages/workspace/workspace-home-page";
import { test as base, Page } from "@playwright/test";
import { setCredential } from "@utils/credential-context";
import { loadCredential } from "@utils/credentials";
import * as dotenv from "dotenv";
import * as path from "path";

const envArg = process.env.ENV || 'local';
let envFile = 'credentials.env';
if (envArg === 'stage') envFile = 'credentials.stage.env';
else if (envArg === 'test1') envFile = 'credentials.test1.env';
else if (envArg === 'test2') envFile = 'credentials.test2.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

type Credential = {
  baseUrl: string;
  communityKey?: string;
};

type PageFixtures = {
  workspaceHomePageWithAuth: (credentialKey: string) => Promise<WorkspaceHomePage>;
  workspaceInfoPageWithAuth: (credentialKey: string) => Promise<WorkspaceInfoPage>;
  communityHomePageWithAuth: (credentialKey: string) => Promise<CommunityHomePage>;
  ideaDetailsPageWithAuth: (credentialKey: string) => Promise<IdeaDetailsPage>;
};

function createPageObject<T extends BasePage>(
  createInstance: (page: Page, credential: Credential) => T
) {
  return async (
    { browser }: { browser: any },
    use: (fn: (credentialKey: string) => Promise<T>) => Promise<void>
  ) => {
    const fn = async (credentialKey: string): Promise<T> => {
      setCredential(credentialKey);
      const credential = loadCredential(credentialKey);

      const context = await browser.newContext({
        storageState: `.auth/${credentialKey.toLowerCase().replace(/_/g, "-")}.json`,
      });

      const page = await context.newPage();
      return createInstance(page, credential);
    };

    await use(fn);
  };
}

export const test = base.extend<PageFixtures>({
  workspaceHomePageWithAuth: createPageObject((page, credential) => new WorkspaceHomePage(page).withBaseUrl(credential.baseUrl)),
  workspaceInfoPageWithAuth: createPageObject((page, credential) => new WorkspaceInfoPage(page).withBaseUrl(credential.baseUrl)),
  communityHomePageWithAuth: createPageObject((page, credential) => new CommunityHomePage(page).withBaseUrl(credential.baseUrl).withCommunityKey(credential.communityKey)),
  ideaDetailsPageWithAuth: createPageObject((page, credential) => new IdeaDetailsPage(page).withBaseUrl(credential.baseUrl).withCommunityKey(credential.communityKey))
});

export { expect } from "@playwright/test";