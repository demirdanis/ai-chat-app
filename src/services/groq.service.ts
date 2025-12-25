import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export class GroqService {
  static async createChatStream(message: string, systemPrompt: string) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt || "You are a helpful assistant.",
          },
          { role: "user", content: message },
        ],
        model: "llama-3.3-70b-versatile",
        stream: true,
      });

      const encoder = new TextEncoder();

      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of chatCompletion) {
              const content = chunk.choices[0]?.delta?.content || "";
              controller.enqueue(encoder.encode(content));
            }
          } catch (error) {
            controller.error(error);
          } finally {
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } catch (error) {
      console.error("Groq Service Error:", error);
      return new Response(JSON.stringify({ error: "Stream başlatılamadı" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}
