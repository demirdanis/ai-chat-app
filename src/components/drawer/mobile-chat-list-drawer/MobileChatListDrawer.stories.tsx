import type { Meta, StoryObj } from "@storybook/react";

import { DrawerProvider } from "@/components/provider/DrawerProvider";
import { ChatListView } from "@/components/chat-list/ChatList.view";
import { MobileChatListDrawer } from "./MobileChatListDrawer";

const meta = {
  title: "Components/MobileChatListDrawer",
  component: MobileChatListDrawer,
  tags: ["autodocs"],
  render: () => (
    <DrawerProvider>
      <div className="p-6">
        <MobileChatListDrawer>
          <div className="h-[360px]">
            <ChatListView
              chats={[
                {
                  id: "chat-1",
                  title: "Chat A",
                  created_at: new Date().toISOString(),
                  characters: [{ name: "Assistant" }],
                },
                {
                  id: "chat-2",
                  title: "Chat B",
                  created_at: new Date(Date.now() - 3_600_000).toISOString(),
                  characters: [{ name: "Helper" }],
                },
              ]}
            />
          </div>
        </MobileChatListDrawer>
      </div>
    </DrawerProvider>
  ),
} satisfies Meta<typeof MobileChatListDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
