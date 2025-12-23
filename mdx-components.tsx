import React from "react";
import type { MDXComponents } from "mdx/types";
import Reference from "@/components/reference";
import ComponentPreview from "./components/component-preview";
import CommandBlock, {
  CommandBlockProps,
} from "./components/chatcn/ai/command-tabs";
import CodeBlockClientWrapper from "./components/code-block-client-wrapper";
import CodeSource from "./components/codesource";
import Installation from "./components/installation";
import { ContributorsPage } from "./components/core/contributors";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Reference: Reference,
    ComponentPreview: (
      props: React.ComponentProps<typeof ComponentPreview>
    ) => (
      <div className="not-prose">
        <ComponentPreview {...props} />
      </div>
    ),
    CommandBlock: ({ ...props }: CommandBlockProps) => (
      <CommandBlock className="not-prose" {...props} />
    ),
    CodeBlock: (props: React.ComponentProps<typeof CodeBlockClientWrapper>) => (
      <div className="not-prose">
        <CodeBlockClientWrapper {...props} />
      </div>
    ),
    CodeSource: (props: React.ComponentProps<typeof CodeSource>) => (
      <div className="not-prose">
        <CodeSource {...props} />
      </div>
    ),
    Installation: (props: React.ComponentProps<typeof Installation>) => (
      <div className="not-prose">
        <Installation {...props} />
      </div>
    ),
    ContributorsPage: ContributorsPage,
    // Handle code blocks from rehype-pretty-code
    pre: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLPreElement> & { "data-theme"?: string }) => {
      // If rehype-pretty-code processed this, don't add bg-card
      const isHighlighted = "data-theme" in props;
      return (
        <pre
          className={`overflow-x-auto rounded-lg border p-4 text-sm ${
            isHighlighted ? "" : "bg-card"
          }`}
          {...props}
        >
          {children}
        </pre>
      );
    },
  };
}
