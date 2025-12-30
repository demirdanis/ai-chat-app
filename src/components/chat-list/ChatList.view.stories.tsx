import type { Meta, StoryObj } from "@storybook/react";

import { ChatListView } from "./ChatList.view";

const meta = {
  title: "Components/ChatListView",
  component: ChatListView,
  tags: ["autodocs"],
  args: {
    chats: [
      {
        id: "chat-1",
        title: "First chat",
        created_at: new Date(Date.now() - 60_000).toISOString(),
        characters: [{ name: "Assistant" }],
      },
      {
        id: "chat-2",
        title: "Another chat",
        created_at: new Date(Date.now() - 3_600_000).toISOString(),
        characters: [{ name: "Helper" }],
      },
    ],
  },
  render: (args) => (
    <div className="h-[420px] w-80 border bg-background">
      <ChatListView {...args} />
    </div>
  ),
} satisfies Meta<typeof ChatListView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
