"use client";

import { ChatClientProps, MessageRow } from "./ChatClient.types";
import { saveAssistantMessage, sendMessage } from "@/app/chat/[chatId]/actions";
import { useEffect, useRef, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownMessage } from "@/components/markdown-message/MarkdownMessage";
import { TypingDots } from "../ui/typing-dots";
import { streamChat } from "@/lib/stream";
import { useRouter } from "next/navigation";

export const ChatClient = ({ chatId, initialMessages }: ChatClientProps) => {
  const router = useRouter();

  const [messages, setMessages] = useState<MessageRow[]>(initialMessages);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const didInitialAnimatedScrollRef = useRef(false);

  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [focusMessageId, setFocusMessageId] = useState<string | null>(null);

  useEffect(() => {
    if (!focusMessageId) return;
    const el = messageRefs.current[focusMessageId];
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [focusMessageId]);

  useEffect(() => {
    if (didInitialAnimatedScrollRef.current) return;
    if (messages.length === 0) return;

    const lastId = messages[messages.length - 1]?.id;
    const lastEl = lastId ? messageRefs.current[lastId] : null;
    if (!lastEl) return;

    didInitialAnimatedScrollRef.current = true;

    window.scrollTo({ top: 0, behavior: "auto" });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lastEl.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || isPending) return;

    setError(null);
    setText("");

    const optimisticUser: MessageRow = {
      id: `optimistic-user-${crypto.randomUUID()}`,
      chat_id: chatId,
      role: "user",
      content: trimmed,
      created_at: new Date().toISOString(),
    };

    const optimisticAssistant: MessageRow = {
      id: `optimistic-assistant-${crypto.randomUUID()}`,
      chat_id: chatId,
      role: "assistant",
      content: "",
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticUser, optimisticAssistant]);

    setFocusMessageId(optimisticUser.id);

    startTransition(async () => {
      try {
        const savedUser = await sendMessage(chatId, trimmed);

        setMessages((prev) =>
          prev.map((m) => (m.id === optimisticUser.id ? savedUser : m))
        );

        setFocusMessageId(savedUser.id);

        router.refresh();

        let assistantText = "";
        await streamChat(chatId, trimmed, (chunk) => {
          assistantText += chunk;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === optimisticAssistant.id
                ? { ...m, content: assistantText }
                : m
            )
          );
        });

        setFocusMessageId(optimisticAssistant.id);

        const saved = await saveAssistantMessage(chatId, assistantText);

        setMessages((prev) =>
          prev.map((m) => (m.id === optimisticAssistant.id ? saved : m))
        );

        setFocusMessageId(saved.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Streaming failed");
        setMessages((prev) =>
          prev.filter((m) => m.id !== optimisticAssistant.id)
        );
      }
    });
  };

  return (
    <div className="flex h-[calc(100dvh-56px-48px)] flex-col">
      <div className="flex-1 overflow-y-auto rounded-xl border bg-background p-4">
        {messages.length === 0 ? (
          <div className="py-10 text-center">
            <div className="text-sm font-medium">Start a conversation</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Send your first message below.
            </div>
          </div>
        ) : (
          <div className="space-y-4 flex flex-col">
            {messages.map((m) => (
              <div
                key={m.id}
                ref={(el) => {
                  messageRefs.current[m.id] = el;
                }}
                className={[
                  "rounded-2xl px-4 py-2 text-sm transition-all",
                  "w-fit max-w-[80%]",
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground rounded-tr-none"
                    : "mr-auto bg-[#f3f3f3] dark:bg-[#27272a] text-foreground rounded-tl-none border border-border/50",
                ].join(" ")}
              >
                {m.role === "assistant" ? (
                  m.content.trim().length === 0 ? (
                    <div className="text-sm opacity-70">
                      <TypingDots />
                    </div>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <MarkdownMessage content={m.content} />
                    </div>
                  )
                ) : (
                  <span className="whitespace-pre-wrap leading-relaxed">
                    {m.content}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {error ? (
        <div className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending || text.trim().length === 0}>
          {isPending ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
};
