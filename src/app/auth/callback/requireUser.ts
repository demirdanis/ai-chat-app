import { getUserService } from "@/services/user.service";
import { redirect } from "next/navigation";

const allowedEmails = new Set(
  (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
);
export const requireUser = async () => {
  const { data } = await getUserService();

  const email = data.user?.email ?? "";
  if (!data.user || !allowedEmails.has(email)) {
    redirect("/login?reason=unauthorized");
  }

  return { user: data.user };
};
