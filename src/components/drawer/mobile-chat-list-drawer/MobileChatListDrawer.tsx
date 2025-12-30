"use client";

import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MobileChatListDrawerProps } from "./MobileChatListDrawer.types";
import { useDrawer } from "@/components/provider/DrawerProvider";
import { useEffect } from "react";

export const MobileChatListDrawer = ({
  children,
}: MobileChatListDrawerProps) => {
  const { open, setOpen } = useDrawer();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams?.toString()]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-80 p-0 [&>button]:hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetHeader className="p-0">
              <SheetTitle className="text-base">Chats</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-2">
              <SheetClose asChild>
                <Button asChild size="sm">
                  <Link href="/chat">+ New</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close drawer">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
          </div>
        </div>

        <div className="p-2">{children}</div>
      </SheetContent>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open chats"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </Sheet>
  );
};
