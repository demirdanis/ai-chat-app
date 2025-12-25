import { NextResponse } from "next/server";
import { exchangeCodeForSession } from "@/services/auth.server.service";

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.redirect(`${origin}/login`);

  const { error } = await exchangeCodeForSession(code);

  if (error) return NextResponse.redirect(`${origin}/login`);

  return NextResponse.redirect(`${origin}/chat`);
};
