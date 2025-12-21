import { cn } from "@/lib/utils";
import { SourceCodeIcon, Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { useState } from "react";

export default function Install({
  code,
  component,
}: {
  component: string;
  code: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  function copyToClipBoard() {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setIsCopied(true);
        toast("Copied Component Code");
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  }

  return (
    <div
      onClick={copyToClipBoard}
      className={cn(
        "md:flex items-center px-2 text-base hidden border shadow-xs rounded-lg text-primary space-x-1 cursor-pointer transition-colors",
        isCopied
          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-700"
          : "bg-linear-to-t from-primary/5 to-card dark:bg-card hover:bg-secondary/80"
      )}
    >
      {!isCopied ? (
        <HugeiconsIcon icon={SourceCodeIcon} size={18} />
      ) : (
        <HugeiconsIcon icon={Tick01Icon} size={18} />
      )}
      <p className="font-sans">@chatcn/{component}</p>
    </div>
  );
}
