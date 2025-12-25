"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useTransition } from "react";

import { Button } from "../ui/button";
import { CharacterPickerProps } from "./CharacterPicker.types";
import { createChat } from "@/app/chat/actions";
import { prepareAvatarShortName } from "@/lib/avatar";
import { useRouter } from "next/navigation";

export const CharacterPicker = ({ characters }: CharacterPickerProps) => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    if (!selectedId) return;

    setError(null);
    startTransition(async () => {
      try {
        const chatId = await createChat(selectedId);
        router.push(`/chat/${chatId}`);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Failed to create chat");
        }
      }
    });
  };

  return (
    <div className="space-y-4">
      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {characters.map((c) => {
          const active = c.id === selectedId;

          return (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={[
                "w-full rounded-xl border p-4 text-left transition-colors",
                "hover:bg-soft/60",
                active
                  ? "border-primary bg-soft text-primary"
                  : "border-border",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={c.avatar_url ?? undefined} alt={c.name} />
                  <AvatarFallback>
                    {prepareAvatarShortName(c.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {c.system_prompt}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-end">
        <Button onClick={handleStart} disabled={!selectedId || isPending}>
          {isPending ? "Creating..." : "Start chat"}
        </Button>
      </div>
    </div>
  );
};
