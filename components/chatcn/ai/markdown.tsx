import React from "react"
import { default as MarkdownRender } from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"
import {
  CodeBlockRoot,
  CodeBlockContent,
} from "@/components/chatcn/ai/codeblock"

type MarkDownProps = {
  children: React.ReactNode
  className?: string
  theme?: string
}

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
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            return match ? (
              <CodeBlockRoot
                code={String(children).replace(/\n$/, "")}
                lang="tsx"
                theme={
                  theme === "dark"
                    ? "github-dark-default"
                    : "github-light-default"
                }
                className={cn("not-prose")}
              >
                <CodeBlockContent />
              </CodeBlockRoot>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {String(children)}
      </MarkdownRender>
    </div>
  )
}
