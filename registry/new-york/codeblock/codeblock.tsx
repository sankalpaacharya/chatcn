"use client";
import { JSX, useEffect, useState } from "react";
import { highlight } from "@/registry/new-york/codeblock/utils/shared";
import { Clipboard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calendarCode } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { BundledLanguage } from "shiki/bundle/web";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type CodeBlockProps = {
  initial?: JSX.Element;
  code: string;
  height?: string;
  language: BundledLanguage;
  className?: string;
};

export default function CodeBlock({
  initial,
  className,
  language = "tsx",
  code,
  height = "600",
}: CodeBlockProps) {
  const [nodes, setNodes] = useState(initial);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    void highlight(code, language).then(setNodes);
  }, []);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 10000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };
  return (
    <div
      className={cn(`relative rounded-md text-xl overflow-auto`, className)}
      style={{ height: "100%", maxHeight: `${height}px` }}
    >
      <Tooltip>
        <TooltipTrigger
          className="absolute right-5 top-5 h-8 w-8 p-0 text-md"
          asChild
        >
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Clipboard className="w-4 h-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? "Copied!" : "Copy to Clipboard"}</p>
        </TooltipContent>
      </Tooltip>
      <div className="overflow-x-auto w-full bg-card flex">{nodes}</div>
    </div>
  );
}
