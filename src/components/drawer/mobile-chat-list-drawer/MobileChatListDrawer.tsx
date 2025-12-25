"use client";

import { MessageSquareText, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          aria-describedby={undefined}
          className="w-80 p-0 [&>button]:hidden"
        >
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
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Close drawer"
                    className="
    h-8 w-8
    border border-primary
    text-primary
    hover:bg-primary hover:text-white
    focus-visible:ring-0 focus-visible:ring-offset-0
    active:ring-0 shadow-none
  "
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>
            </div>
          </div>

          <div className="mt-[-16px] h-full">{children}</div>
        </SheetContent>

        <MessageSquareText
          className="h-6 w-6 mr-2 cursor-pointer text-primary/80 transition-colors hover:text-primary"
          onClick={() => setOpen(true)}
        />
      </Sheet>
    </div>
  );
};
