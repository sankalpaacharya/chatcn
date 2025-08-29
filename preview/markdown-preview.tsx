import MarkdownRender from "@/registry/new-york/markdown";

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
  return <MarkdownRender theme="dark">{content}</MarkdownRender>;
}
