"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { ProfileMenuProps } from "./ProfileMenu.types";
import { Separator } from "@/components/ui/separator";
import { Switch } from "../../ui/switch";
import { prepareAvatarShortName } from "@/lib/avatar";
import { signOut } from "@/services/auth.client.service";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export const ProfileMenu = ({
  email,
  fullName,
  avatarUrl,
}: ProfileMenuProps) => {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const initials = useMemo(() => prepareAvatarShortName(fullName), [fullName]);

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);
    try {
      await signOut();

      router.replace("/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Profile Menu"
        >
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={avatarUrl ?? undefined} alt={fullName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 p-3 bg-background shadow-xl border-border"
      >
        <div className="space-y-1 px-1">
          <div className="text-sm font-medium leading-none">{fullName}</div>
          <div className="text-xs text-muted-foreground break-all">{email}</div>
        </div>

        <Separator className="my-3" />

        <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2 my-2">
          <div className="flex items-center gap-2.5">
            {isDark ? (
              <Moon className="h-4 w-4 text-primary" />
            ) : (
              <Sun className="h-4 w-4 text-primary" />
            )}
            <span className="text-sm font-medium text-foreground">
              Dark Mode
            </span>
          </div>

          <Switch
            checked={isDark}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>

        <Separator className="my-3" />

        <Button
          type="button"
          variant="outline"
          className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={handleSignOut}
          disabled={signingOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {signingOut ? "Logging out..." : "Logout"}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
