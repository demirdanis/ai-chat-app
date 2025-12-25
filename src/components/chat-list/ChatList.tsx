import { ChatListView } from "./ChatList.view";
import { getAllChats } from "@/services/chat.service";

export const ChatList = async () => {
  const { data: chats } = await getAllChats(50);
  return <ChatListView chats={chats ?? []} />;
};
