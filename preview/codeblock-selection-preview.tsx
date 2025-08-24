"use client";
import React from "react";
import { useTheme } from "next-themes";
import { CodeBlock } from "@/components/codeblock";

export default function CodeBlockPreview() {
  const { theme } = useTheme();

  return (
    <CodeBlock
      highlight={{ start: 1, end: 5 }}
      lang="tsx"
      theme={
        theme === "dark" || theme === "black"
          ? "github-dark-default"
          : "github-light-default"
      }
    >{`function addNumbers(a, b) {
  return \`The sum of \${a} and \${b} is \${a + b}\`;
}

// Call the function
addNumbers(5, 7);`}</CodeBlock>
  );
}
