import { promises as fs } from "fs";
import path from "path";
import CodePreviewInternal from "./code-preview_internal";

export default async function CodePreview({
  component,
}: {
  component: string;
}) {
  const filePath = path.join(process.cwd(), `preview/${component}-preview.tsx`);
  const fileContent = await fs.readFile(filePath, "utf-8");

  return <CodePreviewInternal component={component} code={fileContent} />;
}
