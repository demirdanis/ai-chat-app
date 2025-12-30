import type { Meta, StoryObj } from "@storybook/react";

import { ChatClient } from "@/components/chat-client/ChatClient";

const MockChatDetailPage = () => {
  return (
    <div className="p-6 pointer-events-none">
      <ChatClient
        chatId="chat-1"
        initialMessages={[
          {
            id: "m-1",
            chat_id: "chat-1",
            role: "user",
            content: "Explain what a server component is.",
            created_at: new Date(Date.now() - 60_000).toISOString(),
          },
          {
            id: "m-2",
            chat_id: "chat-1",
            role: "assistant",
            content:
              "A Server Component renders on the server and can access server-only resources.",
            created_at: new Date(Date.now() - 30_000).toISOString(),
          },
        ]}
      />
    </div>
  );
};

const meta = {
  title: "Pages/ChatDetailPage",
  component: MockChatDetailPage,
  tags: ["autodocs"],
} satisfies Meta<typeof MockChatDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mocked: Story = {};
