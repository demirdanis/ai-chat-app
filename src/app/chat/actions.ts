"use server";

import { createChatService } from "@/services/chat.service";
import { getUserService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export const createChat = async (characterId: string) => {
  const { data: userData, error: userErr } = await getUserService();
  if (userErr || !userData.user) throw new Error("Unauthorized");

  const { data, error } = await createChatService(
    userData.user.id,
    characterId
  );

  if (error) throw new Error(error.message);

  revalidatePath("/chat");

  return data.id as string;
};
