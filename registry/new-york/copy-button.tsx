"use client";

import { useState } from "react";
import { Clipboard, Check } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface CopyButtonProps {
  value: string;
  tooltip?: string;
  className?: string;
}

export function CopyButton({ value, tooltip = "Copy to clipboard", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={handleCopy}
        className={`p-1 rounded-md hover:bg-muted transition ${className}`}
      >
        {copied ? <Check size={18} /> : <Clipboard size={18} />}
      </TooltipTrigger>
      <TooltipContent>
        <p>{copied ? "Copied!" : tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
