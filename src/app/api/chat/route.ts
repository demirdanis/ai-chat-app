import { NextResponse } from "next/server";
import { getAllChats } from "@/services/chat.service";
import { getUserService } from "@/services/user.service";

export const GET = async () => {
  const { data: userData } = await getUserService();
  if (!userData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: chats, error } = await getAllChats(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ chats: chats ?? [] });
};
