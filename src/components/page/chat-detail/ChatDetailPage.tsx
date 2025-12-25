import { ChatClient } from "@/components/chat-client/ChatClient";
import { ChatDetailPageProps } from "./ChatDetailPage.types";
import { getAllMessagesByChatId } from "@/services/messages.service";
import { getChatAndOwner } from "@/services/chat.service";
import { requireUser } from "@/app/auth/callback/requireUser";

const ChatDetailPage = async ({ params }: ChatDetailPageProps) => {
  await requireUser();
  const { chatId } = await params;

  const { data: chat, error: chatErr } = await getChatAndOwner(chatId);

  if (chatErr || !chat) {
    return (
      <div className="p-6 text-sm text-destructive">
        Chat not found or you don’t have access.
      </div>
    );
  }

  const { data: messages, error: msgErr } = await getAllMessagesByChatId(
    chatId
  );

  if (msgErr) {
    return (
      <div className="p-6 text-sm text-destructive">
        Failed to load messages: {msgErr.message}
      </div>
    );
  }

  return <ChatClient chatId={chatId} initialMessages={messages ?? []} />;
};

export default ChatDetailPage;
