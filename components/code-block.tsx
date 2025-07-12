import React from "react";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import CopyClipBoard from "@/components/copyClipBoard";

type Props = {
  className?: string;
  code: string;
  lang: BundledLanguage;
};

export default async function CodeBlock({ code, lang, className }: Props) {
  const out = await codeToHtml(code, {
    lang,
    theme: "ayu-dark",
  });

  return (
    <ScrollArea className="h-[700px] rounded-md border p-4">
      <div className="flex justify-end px-10 mb-2">
        <CopyClipBoard text={code} />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: out }}
        className={cn(className, "rounded-lg")}
      />
    </ScrollArea>
  );
}
