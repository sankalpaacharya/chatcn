"use client"
import React from "react"
import { useTheme } from "next-themes"
import {
  CodeBlockRoot,
  CodeBlockContent,
} from "@/components/chatcn/ai/codeblock"

const codeExample = `function addNumbers(a, b) {
  return \`The sum of \${a} and \${b} is \${a + b}\`;
}

// Call the function
addNumbers(5, 7);`

export default function CodeBlockSelectionPreview() {
  const { theme } = useTheme()

  return (
    <CodeBlockRoot
      code={codeExample}
      lang="tsx"
      theme={
        theme === "dark" || theme === "black"
          ? "github-dark-default"
          : "github-light-default"
      }
      highlight={{ start: 1, end: 5 }}
    >
      <CodeBlockContent />
    </CodeBlockRoot>
  )
}
