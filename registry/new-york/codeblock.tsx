"use client";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import { Clipboard, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

type Props = {
  children: string;
  lang: BundledLanguage;
  height?: string;
  className?: string;
  highlight?: { start: number; end: number };
  theme?: string;
};

export function CodeBlock({
  children,
  theme = "github-dark-default",
  lang,
  height = "600",
  className,
  highlight,
}: Props) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    const generateHtml = async () => {
      if (!children) setHtml("<pre><code></code></pre>");
      const out = await codeToHtml(children, {
        lang,
        theme,
        colorReplacements: {
          "#0d1117": "var(--card)",
          "#ffffff": "var(--card)",
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
    };

    generateHtml();
  }, [children, lang, theme]);


  return (
    <div
      className={cn(
        "relative rounded-md md:text-xl overflow-auto border bg-card w-full max-w-full shrink",
        className
      )}
      style={{ height: "100%", maxHeight: `${height}px` }}
    >
      <div className="sticky top-5 flex justify-end -mt-8 mr-5">
      <CopyButton value={children} />
      </div>

      {html == null ? (
        <div className="w-full overflow-x-auto text-sm md:text-base [&>pre]:px-4 [&>pre]:py-4">
          <pre className="bg-card text-foreground">
            <code>
              {children.split("\n").map((line, i) => (
                <span key={i} className="line">
                  {line}
                  {"\n"}
                </span>
              ))}
            </code>
          </pre>
        </div>
      ) : (
        <div
          className={cn(
            "w-full overflow-x-auto md:text-base text-sm [&>pre]:px-4 [&>pre]:py-4"
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
