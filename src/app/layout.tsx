import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import ToastProvider from "@/components/provider/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Chat App",
    template: "%s · AI Chat App",
  },
  description:
    "A production-ready AI chat application featuring multiple AI personas, real-time streaming responses, persistent chat history, and a mobile-first user experience.",
  applicationName: "AI Chat App",
  keywords: [
    "AI Chat",
    "LLM",
    "Next.js",
    "Supabase",
    "Streaming AI",
    "Chat Application",
    "OpenAI",
    "Groq",
  ],
  authors: [{ name: "Demir Danış" }],
  creator: "Demir Danış",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
