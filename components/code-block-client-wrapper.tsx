"use client";
import { useTheme } from "next-themes";
import { CodeBlock } from "./chatcn/ai/codeblock";
import { BundledLanguage } from "shiki";

export default function CodeBlockClientWrapper({
  children,
  lang,
}: {
  children: string;
  lang: BundledLanguage;
}) {
  const { theme } = useTheme();
  return (
    <CodeBlock
      className="not-prose"
      theme={theme == "dark" ? "github-dark-default" : "github-light-default"}
      lang={lang}
    >
      {children}
    </CodeBlock>
  );
}
