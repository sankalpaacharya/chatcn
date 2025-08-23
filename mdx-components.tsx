import type { MDXComponents } from "mdx/types";
import Reference from "@/components/reference";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Reference: Reference,
  };
}
