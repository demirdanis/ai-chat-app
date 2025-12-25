"use client";

import { HeaderProps } from "./Header.types";
import Image from "next/image";
import { ProfileMenu } from "@/components/menu/profile-menu/ProfileMenu";
export const Header = ({
  email,
  fullName,
  avatarUrl,
  leftSlot,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/40 bg-soft/70 backdrop-blur supports-[backdrop-filter]:bg-soft/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold tracking-tight text-primary">
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          {leftSlot}
        </div>

        <div className="flex items-center gap-2">
          <ProfileMenu
            email={email}
            fullName={fullName}
            avatarUrl={avatarUrl}
          />
        </div>
      </div>
    </header>
  );
};
