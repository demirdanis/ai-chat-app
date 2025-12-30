import type { Meta, StoryObj } from "@storybook/react";

import { DrawerProvider } from "@/components/provider/DrawerProvider";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { Header } from "@/components/layout/header/Header";
import { ChatListView } from "@/components/chat-list/ChatList.view";
import { MobileChatListDrawer } from "@/components/drawer/mobile-chat-list-drawer/MobileChatListDrawer";
import { Separator } from "@/components/ui/separator";

const MockChatLayout = () => {
  return (
    <ThemeProvider>
      <DrawerProvider>
        <div className="h-dvh flex flex-col overflow-hidden">
          <Header
            email="jane.doe@example.com"
            fullName="Jane Doe"
            avatarUrl="/avatars/1.png"
            leftSlot={
              <MobileChatListDrawer>
                <div className="h-[360px]">
                  <ChatListView
                    chats={[
                      {
                        id: "chat-1",
                        title: "Mock chat",
                        created_at: new Date().toISOString(),
                        characters: [{ name: "Assistant" }],
                      },
                    ]}
                  />
                </div>
              </MobileChatListDrawer>
            }
          />

          <div className="flex flex-1 min-h-0 overflow-hidden">
            <aside className="hidden md:flex w-72 shrink-0 flex-col border-r border-primary/40 bg-background min-h-0 overflow-hidden">
              <div className="p-4 text-sm font-semibold">Chats</div>
              <Separator className="shrink-0" />
              <ChatListView
                chats={[
                  {
                    id: "chat-1",
                    title: "Mock chat",
                    created_at: new Date().toISOString(),
                    characters: [{ name: "Assistant" }],
                  },
                ]}
              />
            </aside>

            <main className="flex-1 min-h-0 overflow-y-hidden px-4 py-6">
              <div className="rounded-xl border bg-background p-4 text-sm">
                Chat content...
              </div>
            </main>
          </div>
        </div>
      </DrawerProvider>
    </ThemeProvider>
  );
};

const meta = {
  title: "Layout/ChatLayout",
  component: MockChatLayout,
  tags: ["autodocs"],
} satisfies Meta<typeof MockChatLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mocked: Story = {};
