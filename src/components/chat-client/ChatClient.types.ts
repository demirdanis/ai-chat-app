import { Database } from "@/types/supabase";

export type MessageRow = Database["public"]["Tables"]["messages"]["Row"];

export type ChatClientProps = {
  chatId: string;
  initialMessages: MessageRow[];
};
