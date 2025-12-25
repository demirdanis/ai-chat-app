"use server";

import {
  getChatAndOwner,
  getChatByIdForChatList,
  updateChatTitle,
} from "@/services/chat.service";

import type { Database } from "@/types/supabase";
import { getUserService } from "@/services/user.service";
import { insertMessage } from "@/services/messages.service";

type MessageRow = Database["public"]["Tables"]["messages"]["Row"];

const MAX_MESSAGE_CHARS = 8000;

const sanitizeText = (input: string) => {
  const text = input.trim();
  if (!text) throw new Error("Message is empty");
  if (text.length > MAX_MESSAGE_CHARS) {
    throw new Error(`Message is too long (max ${MAX_MESSAGE_CHARS} chars)`);
  }
  return text;
};

const assertChatOwnership = async (chatId: string, userId: string) => {
  const { data: chat, error } = await getChatAndOwner(chatId);

  if (error || !chat) throw new Error("Chat not found");
  if (chat.user_id !== userId) throw new Error("Forbidden");

  return chat;
};

export const sendMessage = async (
  chatId: string,
  content: string
): Promise<MessageRow> => {
  const text = sanitizeText(content);

  const { data: userData, error: userErr } = await getUserService();
  const user = userData?.user;
  if (userErr || !user) throw new Error("Unauthorized");

  const { data: chat, error: chatErr } = await getChatByIdForChatList(chatId);

  if (chatErr || !chat) throw new Error("Chat not found");
  if (chat.user_id !== user.id) throw new Error("Forbidden");

  const { data, error } = await insertMessage(chatId, text, "user");

  if (error) throw new Error(error.message);

  if (!chat.title) {
    const title = text.replace(/\s+/g, " ").trim().slice(0, 48);
    if (title.length > 0) {
      await updateChatTitle(chatId, title, user.id);
    }
  }

  return data;
};

export const saveAssistantMessage = async (
  chatId: string,
  content: string
): Promise<MessageRow> => {
  const text = sanitizeText(content);

  const { data: userData, error: userErr } = await getUserService();
  const user = userData?.user;
  if (userErr || !user) throw new Error("Unauthorized");

  await assertChatOwnership(chatId, user.id);

  const { data, error } = await insertMessage(chatId, text, "assistant");

  if (error) throw new Error(error.message);

  return data;
};
