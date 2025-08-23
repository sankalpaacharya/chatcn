import { promises as fs } from "fs";
import path from "path";
import ComponentPreviewInternal from "./component-preview_internal";

export default async function ComponentPreview({
  component,
}: {
  component: string;
}) {
  const filePath = path.join(process.cwd(), `preview/${component}-preview.tsx`);
  const fileContent = await fs.readFile(filePath, "utf-8");

  return <ComponentPreviewInternal component={component} code={fileContent} />;
}
