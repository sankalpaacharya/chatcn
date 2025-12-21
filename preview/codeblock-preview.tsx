"use client"
import React from "react"
import {
  CodeBlockRoot,
  CodeBlockHeader,
  CodeBlockContent,
} from "@/components/chatcn/ai/codeblock"

const codeExample = `function addNumbers(a, b) {
  return \`The sum of \${a} and \${b} is \${a + b}\`;
}

// Call the function
addNumbers(5, 7);`

export default function CodeBlockPreview() {
  return (
    <CodeBlockRoot
      code={codeExample}
      lang="tsx"
      height="300"
    >
      <CodeBlockHeader
        icon="typescript"
        filename="example.tsx"
        showThemeSelector
        showCopyButton
      />
      <CodeBlockContent />
    </CodeBlockRoot>
  )
}
