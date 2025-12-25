import { Button } from "@/components/ui/button";
import { ChatList } from "../chat-list/ChatList";
import Link from "next/link";
import { Separator } from "../ui/separator";

export const ChatSidebar = async () => {
  return (
    <aside className="hidden md:flex w-72 shrink-0 flex-col border-r border-primary/40 bg-background min-h-0 overflow-hidden">
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
        <ChatList />
      </div>
    </aside>
  );
};
