import "../src/app/globals.css";

import type { Preview } from "@storybook/react";

declare global {
  // eslint-disable-next-line no-var
  var process: { env: Record<string, string | undefined> } | undefined;
}

if (typeof globalThis.process === "undefined") {
  // Minimal shim for libs expecting process.env in the browser.
  (globalThis as unknown as { process: { env: Record<string, string> } }).process = {
    env: {},
  };
}

globalThis.process.env.NEXT_PUBLIC_SUPABASE_URL ??= "https://example.supabase.co";
globalThis.process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??= "storybook-mock-anon-key";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
