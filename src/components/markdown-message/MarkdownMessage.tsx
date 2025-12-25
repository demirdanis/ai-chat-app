import { MarkdownMessageProps } from "./MarkdownMessage.types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MarkdownMessage = ({ content }: MarkdownMessageProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ children, ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            {children}
          </a>
        ),
        ul: ({ children, ...props }) => (
          <ul {...props} className="list-disc pl-5 space-y-1">
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol {...props} className="list-decimal pl-5 space-y-1">
            {children}
          </ol>
        ),
        code: ({ children, className }) => {
          const isInline = !className;
          return (
            <code
              className={[
                "rounded font-mono text-[0.85em]",
                isInline
                  ? "bg-black/5 dark:bg-white/10 px-1 py-0.5"
                  : "block overflow-x-auto bg-black/10 dark:bg-white/5 p-3",
              ].join(" ")}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => <pre className="m-0">{children}</pre>,
        blockquote: ({ children, ...props }) => (
          <blockquote
            {...props}
            className="border-l-2 pl-3 text-muted-foreground"
          >
            {children}
          </blockquote>
        ),
        h1: ({ children, ...props }) => (
          <h1 {...props} className="text-lg font-semibold">
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 {...props} className="text-base font-semibold">
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 {...props} className="text-sm font-semibold">
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p {...props} className="leading-relaxed">
            {children}
          </p>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
