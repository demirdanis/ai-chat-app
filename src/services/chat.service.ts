import { createClient } from "@/lib/supabase/server";

export const createChatService = async (
  userId: string,
  characterId: string
) => {
  const supabase = await createClient();

  return await supabase
    .from("chats")
    .insert({
      user_id: userId,
      character_id: characterId,
      title: null,
    })
    .select("id")
    .single();
};

export const getAllChats = async (limit: number) => {
  const supabase = await createClient();

  return await supabase
    .from("chats")
    .select("id, title, created_at, characters(name)")
    .order("created_at", { ascending: false })
    .limit(limit);
};

export const getChatCharakterByChatId = async (chatId: string) => {
  const supabase = await createClient();

  return await supabase
    .from("chats")
    .select("character_id")
    .eq("id", chatId)
    .single();
};

export const getChatByIdForChatList = async (chatId: string) => {
  const supabase = await createClient();

  return await supabase
    .from("chats")
    .select("id, title, user_id")
    .eq("id", chatId)
    .single();
};

export const updateChatTitle = async (
  chatId: string,
  title: string,
  userId: string
) => {
  const supabase = await createClient();

  return await supabase
    .from("chats")
    .update({ title })
    .eq("id", chatId)
    .eq("user_id", userId);
};

export const getChatAndOwner = async (chatId: string) => {
  const supabase = await createClient();

  return await supabase
    .from("chats")
    .select("id, user_id")
    .eq("id", chatId)
    .single();
};
