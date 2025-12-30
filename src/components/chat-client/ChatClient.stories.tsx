import type { Meta, StoryObj } from "@storybook/react";

import { ChatClient } from "./ChatClient";

const meta = {
  title: "Components/ChatClient",
  component: ChatClient,
  tags: ["autodocs"],
  args: {
    chatId: "chat-1",
    initialMessages: [
      {
        id: "m-1",
        chat_id: "chat-1",
        role: "user",
        content: "Hello!",
        created_at: new Date(Date.now() - 60_000).toISOString(),
      },
      {
        id: "m-2",
        chat_id: "chat-1",
        role: "assistant",
        content: "Hi! How can I help you today?",
        created_at: new Date(Date.now() - 30_000).toISOString(),
      },
    ],
  },
  render: (args) => (
    <div className="p-6 pointer-events-none">
      <ChatClient {...args} />
    </div>
  ),
} satisfies Meta<typeof ChatClient>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
