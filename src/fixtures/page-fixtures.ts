import { CommunityHomePage } from "@pages/community/community-home-page";
import { WorkspaceHomePage } from "@pages/workspace/workspace-home-page";
import { test as base } from "@playwright/test";
import * as dotenv from "dotenv";
import * as path from "path";

const envArg = process.env.ENV || 'local';
let envFile = 'credentials.env';
if (envArg === 'stage') envFile = 'credentials.stage.env';
else if (envArg === 'test1') envFile = 'credentials.test1.env';
else if (envArg === 'test2') envFile = 'credentials.test2.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

type PageFixtures = {
    adminPanelWorkspaceHomePage: WorkspaceHomePage;
    adminPanelPrivateCommunityHomePage: CommunityHomePage;
    adminPanelPublicCommunityHomePage: CommunityHomePage;
};

export const test = base.extend<PageFixtures>({
    adminPanelWorkspaceHomePage: async ({ page }, use) => {
        const adminPanelWorkspaceHomePage = new WorkspaceHomePage(page, process.env.ADMIN_PANEL_WORKSPACE_BASE_URL);
        await use(adminPanelWorkspaceHomePage);
    },

    adminPanelPrivateCommunityHomePage: async ({ page }, use) => {
        const adminPanelPrivateCommunityHomePage = new CommunityHomePage(page, process.env.ADMIN_PANEL_WORKSPACE_BASE_URL, process.env.ADMIN_PANEL_PRIVATE_COMMUNITY_KEY);
        await use(adminPanelPrivateCommunityHomePage);
    },

    adminPanelPublicCommunityHomePage: async ({ page }, use) => {
        const adminPanelPublicCommunityHomePage = new CommunityHomePage(page, process.env.ADMIN_PANEL_WORKSPACE_BASE_URL, process.env.ADMIN_PANEL_PUBLIC_COMMUNITY_KEY);
        await use(adminPanelPublicCommunityHomePage);
    },
});