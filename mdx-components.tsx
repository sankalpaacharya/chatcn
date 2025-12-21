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
    ComponentPreview: ComponentPreview,
    CommandBlock: ({ ...props }: CommandBlockProps) => (
      <CommandBlock className="not-prose" {...props} />
    ),
    CodeBlock: CodeBlockClientWrapper,
    CodeSource: CodeSource,
    Installation: Installation,
    ContributorsPage: ContributorsPage,
    // Handle code blocks from rehype-pretty-code
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement> & { 'data-theme'?: string }) => {
      // If rehype-pretty-code processed this, don't add bg-card
      const isHighlighted = 'data-theme' in props
      return (
        <pre
          className={`overflow-x-auto rounded-lg border p-4 text-sm ${isHighlighted ? '' : 'bg-card'}`}
          {...props}
        >
          {children}
        </pre>
      )
    },
  };
}
