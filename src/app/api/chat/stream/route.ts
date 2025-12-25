import { GroqService } from "@/services/groq.service";
import { NextRequest } from "next/server";
import { getCharacterSystemPromptByCharacterId } from "@/services/characters.service";
import { getChatCharakterByChatId } from "@/services/chat.service";
import { getUserService } from "@/services/user.service";
export const runtime = "edge";

export const POST = async (req: NextRequest) => {
  const { chatId, message } = await req.json();

  const {
    data: { user },
  } = await getUserService();

  if (!user) return new Response("Unauthorized", { status: 401 });

  const { data: chat } = await getChatCharakterByChatId(chatId);

  if (!chat) return new Response("Chat not found", { status: 404 });

  const { data: character } = await getCharacterSystemPromptByCharacterId(
    chat.character_id
  );

  return await GroqService.createChatStream(
    message,
    character?.system_prompt || "You are a helpful assistant."
  );
};
