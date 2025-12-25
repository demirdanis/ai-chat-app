"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { signInWithOAuth } from "@/services/auth.client.service";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reason = searchParams.get("reason");

    if (reason === "unauthorized") {
      toast.warning(
        <div>
          <div>
            You do not have permission to sign in with this email address.
          </div>

          <div className="mt-3 text-sm text-muted-foreground">
            Please contact the application administrator to have your email
            address added to the allowed email list.
          </div>
        </div>,
        {
          autoClose: false,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const signInWithGoogle = async () => {
    setLoading(true);

    const { error } = await signInWithOAuth();

    if (error) {
      console.error(error);

      toast.error(
        <div>
          <div>Sign in failed.</div>

          <div className="mt-3 text-sm text-muted-foreground">
            {`We couldn't sign you in with Google. Please try again.`}
          </div>
        </div>
      );

      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">AI Chat</h1>
        <p className="text-sm text-muted-foreground">
          Sign in with Google to continue.
        </p>

        <Button
          className="w-full"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Sign in with Google"}
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
