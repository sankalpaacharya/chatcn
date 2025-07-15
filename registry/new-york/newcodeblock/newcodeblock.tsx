import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import { Clipboard } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Props = {
  children: string;
  lang: BundledLanguage;
  height?: string;
  className?: string;
};

export default async function NewCodeBlock({
  children,
  lang,
  height = "600",
  className,
}: Props) {
  const out = await codeToHtml(children, {
    lang,
    theme: "github-dark-default",
    colorReplacements: {
      "#0d1117": "var(--card)",
    },
  });

  return (
    <div
      className={cn(
        "relative rounded-md text-xl overflow-auto border",
        className
      )}
      style={{ height: "100%", maxHeight: `${height}px` }}
    >
      <div className="sticky top-5 flex justify-end -mt-8 mr-5">
        <Tooltip>
          <TooltipTrigger className="p-1 rounded-md hover:bg-muted transition">
            <Clipboard size={18} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy to Clipboard</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div
        className="overflow-x-auto w-full bg-card flex px-4 py-3"
        dangerouslySetInnerHTML={{ __html: out }}
      />
    </div>
  );
}
