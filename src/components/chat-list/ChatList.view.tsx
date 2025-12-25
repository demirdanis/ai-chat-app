"use client";

import { useEffect, useRef } from "react";

import { ChatListPorps } from "./ChatList.types";
import Link from "next/link";
import { useParams } from "next/navigation";

export const ChatListView = ({ chats }: ChatListPorps) => {
  const { chatId } = useParams<{ chatId?: string }>();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLAnchorElement | null>(null);
  const didScrollRef = useRef(false);

  useEffect(() => {
    if (didScrollRef.current) return;
    if (!activeRef.current) return;

    didScrollRef.current = true;

    requestAnimationFrame(() => {
      activeRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [chatId]);

  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-0 overflow-y-auto pb-4 h-full"
    >
      {chats.map((c, index) => {
        const isActive = c.id === chatId;
        const title = c.title ?? "Untitled chat";
        const character = c.characters as unknown as { name: string };
        const characterName = character?.name ?? "Unknown";

        return (
          <Link
            key={c.id}
            href={`/chat/${c.id}`}
            ref={isActive ? activeRef : null}
            className={[
              "group block px-3 py-3 text-sm transition-colors",
              "hover:bg-soft/60",
              isActive && "bg-soft text-primary",
              index !== chats.length - 1 && "border-b border-soft/40",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="truncate font-medium">{title}</div>

            <div className="text-xs text-muted-foreground">
              with {characterName}
            </div>

            <div className="text-[11px] text-muted-foreground/70">
              {new Date(c.created_at).toLocaleString()}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
