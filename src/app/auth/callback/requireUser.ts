import { getUserService } from "@/services/user.service";
import { redirect } from "next/navigation";

const ALLOWED_EMAILS = new Set(["demirdanis@gmail.com"]);

export const requireUser = async () => {
  const { data } = await getUserService();

  const email = data.user?.email ?? "";
  if (!data.user || !ALLOWED_EMAILS.has(email)) {
    redirect("/login");
  }

  return { user: data.user };
};
