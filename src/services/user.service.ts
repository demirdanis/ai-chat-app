import { createClient } from "@/lib/supabase/server";

export const getUserService = async () => {
  const supabase = await createClient();

  return await supabase.auth.getUser();
};
