import { promises as fs } from "fs";
import path from "path";
import ComponentPreviewInternal from "./component-preview_internal";

export default async function ComponentPreview({
  component,
  isProse,
}: {
  component: string;
  isProse: boolean;
}) {
  const filePath = path.join(process.cwd(), `preview/${component}-preview.tsx`);
  const fileContent = await fs.readFile(filePath, "utf-8");

  return (
    <ComponentPreviewInternal
      isProse={isProse}
      component={component}
      code={fileContent}
    />
  );
}
