import { ChatLayoutProps } from "./ChatLayout.types";
import { ChatList } from "@/components/chat-list/ChatList";
import { ChatSidebar } from "@/components/chat-sidebar/ChatSidebar";
import { DrawerProvider } from "@/components/provider/DrawerProvider";
import { Header } from "../header/Header";
import { MobileChatListDrawer } from "@/components/drawer/mobile-chat-list-drawer/MobileChatListDrawer";
import { requireUser } from "@/app/auth/callback/requireUser";

const ChatLayout = async ({ children }: ChatLayoutProps) => {
  const { user } = await requireUser();

  const fullName =
    user.user_metadata?.full_name ?? user.user_metadata?.name ?? "Kullanıcı";

  const avatarUrl =
    user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null;

  const email = user.email ?? "";

  return (
    <DrawerProvider>
      <div className="h-dvh flex flex-col overflow-hidden">
        <Header
          email={email}
          fullName={fullName}
          avatarUrl={avatarUrl}
          leftSlot={
            <MobileChatListDrawer>
              <ChatList />
            </MobileChatListDrawer>
          }
        />

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <ChatSidebar />

          <main className="flex-1 min-h-0 overflow-y-hidden px-4 py-6">
            {children}
          </main>
        </div>
      </div>
    </DrawerProvider>
  );
};

export default ChatLayout;
