import type { Database } from "@/types/supabase";

type MessageRow = Database["public"]["Tables"]["messages"]["Row"];

export const sendMessage = async (
  chatId: string,
  content: string
): Promise<MessageRow> => {
  return {
    id: `mock-user-${globalThis.crypto?.randomUUID?.() ?? "1"}`,
    chat_id: chatId,
    role: "user",
    content,
    created_at: new Date().toISOString(),
  };
};

export const saveAssistantMessage = async (
  chatId: string,
  content: string
): Promise<MessageRow> => {
  return {
    id: `mock-assistant-${globalThis.crypto?.randomUUID?.() ?? "2"}`,
    chat_id: chatId,
    role: "assistant",
    content,
    created_at: new Date().toISOString(),
  };
};
