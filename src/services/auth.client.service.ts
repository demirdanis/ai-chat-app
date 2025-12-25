import { createClient } from "@/lib/supabase/client";

export const signInWithOAuth = async () => {
  const supabase = await createClient();

  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};
export const signOut = async () => {
  const supabase = await createClient();
  return await supabase.auth.signOut();
};
