"use client";
import React from "react";
import { useTheme } from "next-themes";
import { CodeBlock, CodeBlockTitle } from "@/components/chatcn/ai/codeblock";

export default function CodeBlockTitlePreview() {
  const { theme } = useTheme();

  const code = `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}

export default Counter`;

  return (
    <CodeBlock
      lang="tsx"
      code={code}
      theme={
        theme === "dark" || theme === "black"
          ? "github-dark-default"
          : "github-light-default"
      }
    >
      <CodeBlockTitle lang="typescript">counter.tsx</CodeBlockTitle>
    </CodeBlock>
  );
}
