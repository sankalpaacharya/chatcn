import { promises as fs } from "fs";
import path from "path";
import CodeBlockClientWrapper from "./code-block-client-wrapper";
import registry from "../registry.json";

export default async function CodeSource({ component }: { component: string }) {
  // Find the component in the registry to get its correct path
  const registryItem = registry.items.find((item) => item.name === component);

  let filePath: string;

  if (registryItem && registryItem.files && registryItem.files.length > 0) {
    filePath = path.join(process.cwd(), registryItem.files[0].path);
  } else {
    filePath = path.join(process.cwd(), `components/chatcn/${component}.tsx`);
  }

  const fileContent = await fs.readFile(filePath, "utf-8");
  return (
    <CodeBlockClientWrapper lang="tsx">{fileContent}</CodeBlockClientWrapper>
  );
}
