"use client";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import { Copy01Icon, Tick01Icon, File01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type CodeBlockContextType = {
  code: string;
};

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: "",
});

function useCodeBlockContext() {
  const ctx = useContext(CodeBlockContext);
  if (!ctx) {
    throw Error("useCodeBlockContext must be used within a CodeBlock");
  }
  return ctx;
}

type CodeBlockCopyButtonProps = {
  className?: string;
};

export function CodeBlockCopyButton({ className }: CodeBlockCopyButtonProps) {
  const { code } = useCodeBlockContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn("p-1 rounded-md hover:bg-muted transition", className)}
        onClick={handleCopy}
      >
        {copied ? (
          <HugeiconsIcon icon={Tick01Icon} size={18} />
        ) : (
          <HugeiconsIcon icon={Copy01Icon} size={18} />
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>{copied ? "Copied!" : "Copy to Clipboard"}</p>
      </TooltipContent>
    </Tooltip>
  );
}

type CodeBlockTitleProps = {
  children: string;
  lang?: string;
  className?: string;
};

export function CodeBlockTitle({
  children,
  lang,
  className,
}: CodeBlockTitleProps) {
  const iconUrl = lang
    ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${lang}/${lang}-original.svg`
    : null;

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-4 py-3 border-b bg-muted/30 text-sm text-muted-foreground font-mono",
        className
      )}
    >
      {iconUrl ? (
        <Image
          src={iconUrl}
          alt=""
          width={16}
          height={16}
          className="size-4 shrink-0"
        />
      ) : (
        <HugeiconsIcon
          icon={File01Icon}
          size={16}
          className="text-muted-foreground shrink-0"
        />
      )}
      <span className="truncate font-semibold flex-1">{children}</span>
      <CodeBlockCopyButton />
    </div>
  );
}

type CodeBlockContentProps = {
  className?: string;
};

export function CodeBlockContent({ className }: CodeBlockContentProps) {
  const { code } = useCodeBlockContext();

  return (
    <div
      className={cn(
        "w-full overflow-x-auto text-sm md:text-base [&>pre]:px-4 [&>pre]:py-4",
        className
      )}
    >
      <pre className="bg-background text-foreground">
        <code>
          {code.split("\n").map((line, i) => (
            <span key={i} className="line">
              {line}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

type CodeBlockProps = {
  children?: React.ReactNode;
  code?: string;
  lang: BundledLanguage;
  height?: string;
  className?: string;
  highlight?: { start: number; end: number };
  theme?: string;
};

export function CodeBlock({
  children,
  code,
  theme = "github-dark-default",
  lang,
  height = "600",
  className,
  highlight,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);

  const codeContent = code ?? (typeof children === "string" ? children : "");
  const hasCompoundChildren = children && typeof children !== "string";

  const generateHtml = useCallback(async () => {
    if (!codeContent) {
      setHtml("<pre><code></code></pre>");
      return;
    }
    const out = await codeToHtml(codeContent, {
      lang,
      theme,
      colorReplacements: {
        "#0d1117": "var(--background)",
        "#ffffff": "var(--background)",
      },
      decorations: highlight
        ? [
            {
              start: { line: highlight.start - 1, character: 0 },
              end: { line: highlight.end, character: 0 },
              properties: { class: "bg-muted inline-block" },
            },
          ]
        : [],
    });
    setHtml(out);
  }, [codeContent, lang, theme, highlight]);

  useEffect(() => {
    generateHtml();
  }, [generateHtml]);

  return (
    <CodeBlockContext.Provider value={{ code: codeContent }}>
      <div
        className={cn(
          "relative rounded-xl md:text-xl overflow-auto border shadow-md bg-background w-full max-w-full shrink",
          className
        )}
        style={{ height: "100%", maxHeight: `${height}px` }}
      >
        {hasCompoundChildren ? (
          <>
            {children}
            {html == null ? (
              <CodeBlockContent />
            ) : (
              <div
                className="w-full overflow-x-auto md:text-base text-sm [&>pre]:px-4 [&>pre]:py-4"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}
          </>
        ) : (
          <>
            <div className="sticky top-5 flex justify-end -mt-8 mr-5 z-10">
              <CodeBlockCopyButton />
            </div>
            {html == null ? (
              <CodeBlockContent />
            ) : (
              <div
                className="w-full overflow-x-auto md:text-base text-sm [&>pre]:px-4 [&>pre]:py-4"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}
          </>
        )}
      </div>
    </CodeBlockContext.Provider>
  );
}
