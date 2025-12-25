export const streamChat = async (
  chatId: string,
  message: string,
  onChunk: (text: string) => void
): Promise<string> => {
  const res = await fetch("/api/chat/stream", {
    method: "POST",
    body: JSON.stringify({ chatId, message }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.body) throw new Error("No stream body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let full = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    full += chunk;
    onChunk(chunk);
  }

  return full;
};
