"use client";

import { Button } from "@/components/ui/button";
import { signInWithOAuth } from "@/services/auth.client.service";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const signInWithGoogle = async () => {
    setLoading(true);

    const { error } = await signInWithOAuth();

    if (error) {
      console.error(error);

      toast({
        title: "Sign in failed",
        description: "We couldn't sign you in with Google. Please try again.",
      });

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
