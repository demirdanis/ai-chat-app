"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { signInWithOAuth } from "@/services/auth.client.service";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const reason = useMemo(() => searchParams.get("reason"), [searchParams]);

  useEffect(() => {
    if (reason === "unauthorized") {
      toast.warning(
        <div>
          <div className="font-medium">
            You do not have permission to sign in with this email address.
          </div>

          <div className="mt-3 text-sm text-muted-foreground">
            Please contact the application administrator to have your email
            address added to the allowed email list.
          </div>
        </div>,
        { autoClose: false }
      );
    }
  }, [reason]);

  const signInWithGoogle = async () => {
    setLoading(true);

    const { error } = await signInWithOAuth();

    if (error) {
      console.error(error);

      toast.error(
        <div>
          <div className="font-medium">Sign in failed.</div>

          <div className="mt-3 text-sm text-muted-foreground">
            We couldn&apos;t sign you in with Google. Please try again.
          </div>
        </div>
      );

      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-dvh">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {isDark ? "Dark" : "Light"}
        </span>
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </div>

      <div className="mx-auto flex min-h-dvh max-w-md items-start px-6 pt-24 sm:pt-28">
        <div className="w-full rounded-2xl border bg-background/80 p-6 shadow-sm backdrop-blur sm:p-8">
          <div className="mb-6 flex flex-col items-center gap-3">
            <Image
              src="/logo.png"
              alt="AI Chat Logo"
              width={72}
              height={72}
              priority
            />
            <h1 className="text-2xl font-semibold tracking-tight">AI Chat</h1>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Sign in with Google to continue.
          </p>

          <div className="mt-6 space-y-3">
            <Button
              className="w-full"
              onClick={signInWithGoogle}
              disabled={loading}
            >
              {loading ? "Redirecting..." : "Sign in with Google"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
