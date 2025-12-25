import { createClient } from "@/lib/supabase/server";

export const insertMessage = async (
  chatId: string,
  text: string,
  role: "user" | "assistant"
) => {
  const supabase = await createClient();

  return await supabase
    .from("messages")
    .insert({
      chat_id: chatId,
      role: role,
      content: text,
    })
    .select("*")
    .single();
};
export const getAllMessagesByChatId = async (chatId: string) => {
  const supabase = await createClient();

  return await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });
};
