import React from "react";
import { default as MarkdownRender } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/registry/new-york/codeblock";

type MarkDownProps = { children: React.ReactNode; className?: string };

export default function Markdown({ children, className }: MarkDownProps) {
  return (
    <div
      className={cn(
        "prose prose-slate dark:prose-invert prose-xl text-white max-w-4xl px-3",
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
                className="not-prose"
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
