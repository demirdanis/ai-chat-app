import { createClient } from "@/lib/supabase/server";

export const getCharacterSystemPromptByCharacterId = async (
  characterId: string
) => {
  const supabase = await createClient();

  return await supabase
    .from("characters")
    .select("system_prompt")
    .eq("id", characterId)
    .single();
};

export const getAllCharacters = async () => {
  const supabase = await createClient();

  return await supabase
    .from("characters")
    .select("id,name,avatar_url,system_prompt")
    .order("created_at", { ascending: true });
};
