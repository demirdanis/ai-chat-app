import type { Meta, StoryObj } from "@storybook/react";

import { ChatListView } from "./ChatList.view";

const MockChatList = () => {
  return (
    <ChatListView
      chats={[
        {
          id: "chat-1",
          title: "Mocked ChatList",
          created_at: new Date().toISOString(),
          characters: [{ name: "Assistant" }],
        },
      ]}
    />
  );
};

const meta = {
  title: "Components/ChatList",
  component: MockChatList,
  tags: ["autodocs"],
  render: () => (
    <div className="h-[420px] w-80 border bg-background">
      <MockChatList />
    </div>
  ),
} satisfies Meta<typeof MockChatList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mocked: Story = {};
