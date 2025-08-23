import { promises as fs } from "fs";
import path from "path";
import { CodeBlock } from "./codeblock";

export default async function CodeSource({ component }: { component: string }) {
  const filePath = path.join(
    process.cwd(),
    `registry/new-york/${component}.tsx`
  );
  const fileContent = await fs.readFile(filePath, "utf-8");
  return <CodeBlock lang="tsx">{fileContent}</CodeBlock>;
}
