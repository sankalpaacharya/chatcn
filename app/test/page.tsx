"use client";
import React from "react";
import { useTheme } from "next-themes";
import { CodeBlock } from "@/registry/new-york/codeblock";

export default function CodeBlockPreview() {
  const { theme } = useTheme();

  return (
    <div>
      <CodeBlock
        highlight={{ start: 1, end: 3 }}
        className="w-md break-words whitespace-pre-wrap"
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
    </div>
  );
}
