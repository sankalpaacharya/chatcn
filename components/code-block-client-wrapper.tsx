"use client"
import { useTheme } from "next-themes"
import {
  CodeBlockRoot,
  CodeBlockContent,
} from "./chatcn/ai/codeblock"
import { BundledLanguage } from "shiki"

export default function CodeBlockClientWrapper({
  children,
  lang,
}: {
  children: string
  lang: BundledLanguage
}) {
  const { theme } = useTheme()
  return (
    <CodeBlockRoot
      code={children}
      lang={lang}
      theme={theme === "dark" ? "github-dark-default" : "github-light-default"}
      className="not-prose"
    >
      <CodeBlockContent />
    </CodeBlockRoot>
  )
}
