import { createClient } from "@/lib/supabase/server";

export const exchangeCodeForSession = async (code: string) => {
  const supabase = await createClient();

  return await supabase.auth.exchangeCodeForSession(code);
};
