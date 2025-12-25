export type Chat = {
  id: string;
  title: string | null;
  created_at: string;
  characters: { name: string }[];
};

export type ChatListPorps = {
  chats: Chat[];
};
