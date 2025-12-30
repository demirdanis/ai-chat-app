import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  staticDirs: ["../public"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
 
  webpackFinal: async (config) => {
    const resolveFromRepoRoot = (p: string) => path.resolve(process.cwd(), p);

    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "server-only": resolveFromRepoRoot("src/storybook/mocks/server-only.ts"),
      "@/app/chat/actions": resolveFromRepoRoot(
        "src/storybook/mocks/app-chat-actions.ts"
      ),
      "@/app/chat/[chatId]/actions": resolveFromRepoRoot(
        "src/storybook/mocks/app-chat-chatId-actions.ts"
      ),
      "@/lib/supabase/server": resolveFromRepoRoot(
        "src/storybook/mocks/supabase-server.ts"
      ),
      "next/headers": resolveFromRepoRoot("src/storybook/mocks/next-headers.ts"),
      "next/cache": resolveFromRepoRoot("src/storybook/mocks/next-cache.ts"),
      "next/navigation": resolveFromRepoRoot(
        "src/storybook/mocks/next-navigation.ts"
      ),
    };

    return config;
  },
};

export default config;
