import type { MDXComponents } from "mdx/types";
import Reference from "@/components/reference";
import ComponentPreview from "./components/component-preview";
import CommandBlock from "./registry/new-york/command-tabs";
import CodeBlockClientWrapper from "./components/code-block-client-wrapper";
import CodeSource from "./components/codesource";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Reference: Reference,
    ComponentPreview: ComponentPreview,
    CommandBlock: CommandBlock,
    CodeBlock: CodeBlockClientWrapper,
    CodeSource: CodeSource,
  };
}
