import type { Meta, StoryObj } from "@storybook/react";

import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Header } from "./Header";

const meta = {
  title: "Layout/Header",
  component: Header,
  tags: ["autodocs"],
  args: {
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    avatarUrl: "/avatars/1.png",
    leftSlot: <Button size="sm" variant="outline">Left slot</Button>,
  },
  render: (args) => (
    <ThemeProvider>
      <Header {...args} />
      <div className="p-6 text-sm text-muted-foreground">
        Page content...
      </div>
    </ThemeProvider>
  ),
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
