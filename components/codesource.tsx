import { promises as fs } from "fs";
import path from "path";
import CodeBlockClientWrapper from "./code-block-client-wrapper";

export default async function CodeSource({ component }: { component: string }) {
  const filePath = path.join(
    process.cwd(),
    `registry/new-york/${component}.tsx`
  );
  const fileContent = await fs.readFile(filePath, "utf-8");
  return (
    <CodeBlockClientWrapper lang="tsx">{fileContent}</CodeBlockClientWrapper>
  );
}
