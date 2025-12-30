import type { Meta, StoryObj } from "@storybook/react";

import { ThemeProvider } from "./ThemeProvider";

const meta = {
  title: "Providers/ThemeProvider",
  component: ThemeProvider,
  tags: ["autodocs"],
  render: () => (
    <ThemeProvider>
      <div className="p-6">
        <div className="rounded-lg border bg-background p-4">
          <div className="text-sm font-medium">ThemeProvider</div>
          <div className="text-xs text-muted-foreground">
            Provides next-themes context.
          </div>
        </div>
      </div>
    </ThemeProvider>
  ),
} satisfies Meta<typeof ThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
