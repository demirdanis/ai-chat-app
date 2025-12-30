import type { Meta, StoryObj } from "@storybook/react";

import { Separator } from "./separator";

const meta = {
  title: "Atoms/Separator",
  component: Separator,
  tags: ["autodocs"],
  render: () => (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">Horizontal</div>
        <Separator />
      </div>

      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">Vertical</div>
        <div className="flex h-12 items-center gap-4">
          <span className="text-sm">Left</span>
          <Separator orientation="vertical" />
          <span className="text-sm">Right</span>
        </div>
      </div>
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
