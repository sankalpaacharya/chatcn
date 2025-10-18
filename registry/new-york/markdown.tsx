import React from "react";
import { default as MarkdownRender } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/chatcn/codeblock";

type MarkDownProps = {
  children: React.ReactNode;
  className?: string;
  theme?: string;
};

export function Markdown({ children, className, theme }: MarkDownProps) {
  return (
    <div
      className={cn(
        "prose dark:prose-invert max-w-4xl px-3 prose-pre:p-0 prose-pre:resize-none",
        className
      )}
    >
      <MarkdownRender
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <CodeBlock
                {...props}
                lang={"tsx"}
                theme={
                  theme == "dark"
                    ? "github-dark-default"
                    : "github-light-default"
                }
                className={cn("not-prose")}
                children={String(children).replace(/\n$/, "")}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {String(children)}
      </MarkdownRender>
    </div>
  );
}
