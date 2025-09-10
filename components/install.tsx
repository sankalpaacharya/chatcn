import { cn } from "@/lib/utils";
import { Terminal, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Install({ component }: { component: string }) {
  const [isCopied, setIsCopied] = useState(false);

  function copyToClipBoard() {
    navigator.clipboard
      .writeText(
        `pnpm dlx shadcn@latest add https://shadcn-collections.vercel.app/c/${component}`
      )
      .then(() => {
        setIsCopied(true);
        toast("Copied installation command");
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
          : "bg-gradient-to-t from-primary/5 to-card dark:bg-card hover:bg-secondary/80"
      )}
    >
      {!isCopied ? <Terminal size={18} /> : <Check size={18} />}
      <p className="font-sans">@chatcn/{component}</p>
    </div>
  );
}
