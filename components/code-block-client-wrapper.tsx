"use client";

import { CodeBlock } from "@/registry/new-york/codeblock";
import type { BundledLanguage } from "shiki";

interface CodeBlockWrapperProps {
  code: string;
  language: BundledLanguage;
  theme?: string;
  height?: string;
  highlight?: { start: number; end: number };
}

export default function CodeBlockWrapper({
  code,
  language,
  theme = "github-dark-default",
  height = "600",
  highlight,
}: CodeBlockWrapperProps) {
  return (
    <div className="my-8 w-full">
      <CodeBlock
        theme={theme}
        lang={language}
        height={height}
        highlight={highlight}
      >
        {code}
      </CodeBlock>
    </div>
  );
}
