"use client";
import MarkdownRender from "@/registry/new-york/markdown";
import { useTheme } from "next-themes";

const content = `
# Hello World 👋

This is a **Markdown** example.

## Features
- Bold and *italic* text
- [Links](https://example.com)
- Inline \`code\`
- Block of code:

\`\`\`js
function addNumbers(a, b) {
  return \`The sum of \${a} and \${b} is \${a + b}\`;
}

// Call the function
addNumbers(5, 7)
\`\`\`
`;

export default function MarkdownPreview() {
  const { theme } = useTheme();
  return <MarkdownRender theme={theme}>{content}</MarkdownRender>;
}
