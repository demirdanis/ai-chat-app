import type { Meta, StoryObj } from "@storybook/react";

import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { ProfileMenu } from "./ProfileMenu";

const meta = {
  title: "Components/ProfileMenu",
  component: ProfileMenu,
  tags: ["autodocs"],
  args: {
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    avatarUrl: "/avatars/1.png",
  },
  render: (args) => (
    <ThemeProvider>
      <div className="p-10 flex justify-end">
        <ProfileMenu {...args} />
      </div>
    </ThemeProvider>
  ),
} satisfies Meta<typeof ProfileMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
