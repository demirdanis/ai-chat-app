import { getUserService } from "@/services/user.service";
import { redirect } from "next/navigation";

const rawAllowedEmails = (process.env.ALLOWED_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

const allowAll = rawAllowedEmails.includes("*");

const allowedEmails = new Set(rawAllowedEmails.filter((e) => e !== "*"));

export const requireUser = async () => {
  const { data } = await getUserService();

  const email = data.user?.email?.toLowerCase() ?? "";

  if (!data.user) {
    redirect("/login?reason=unauthorized");
  }

  if (!allowAll && !allowedEmails.has(email)) {
    redirect("/login?reason=unauthorized");
  }

  return { user: data.user };
};
