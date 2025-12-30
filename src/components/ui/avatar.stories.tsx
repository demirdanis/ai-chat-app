import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  render: () => (
    <div className="flex items-center gap-6 p-6">
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">With image</div>
        <Avatar className="h-12 w-12">
          <AvatarImage src="/avatars/1.png" alt="Jane Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">Fallback</div>
        <Avatar className="h-12 w-12">
          <AvatarImage src="/avatars/does-not-exist.png" alt="John Smith" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
      </div>
    </div>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
