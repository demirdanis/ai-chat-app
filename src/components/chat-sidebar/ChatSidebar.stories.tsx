import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ChatListView } from "@/components/chat-list/ChatList.view";

const MockChatSidebar = () => {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-primary/40 bg-background min-h-0 overflow-hidden">
      <div className="shrink-0 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Chats</div>
          <Button asChild size="sm" variant="default">
            <Link href="/chat">+ New</Link>
          </Button>
        </div>
      </div>

      <Separator className="shrink-0" />

      <div className="flex-1 min-h-0">
        <ChatListView
          chats={[
            {
              id: "chat-1",
              title: "Mock chat",
              created_at: new Date().toISOString(),
              characters: [{ name: "Assistant" }],
            },
            {
              id: "chat-2",
              title: "Another mock",
              created_at: new Date(Date.now() - 86_400_000).toISOString(),
              characters: [{ name: "Helper" }],
            },
          ]}
        />
      </div>
    </aside>
  );
};

const meta = {
  title: "Components/ChatSidebar",
  component: MockChatSidebar,
  tags: ["autodocs"],
  render: () => (
    <div className="h-[520px]">
      <MockChatSidebar />
    </div>
  ),
} satisfies Meta<typeof MockChatSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mocked: Story = {};
