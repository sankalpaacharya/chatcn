"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ContentWritingIcon,
  Bug01Icon,
  StarIcon,
  PencilEdit01Icon,
} from "@/components/icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const GITHUB_REPO = "sankalpaacharya/chatcn";

export default function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Generate GitHub URLs based on current path
  const issueUrl = `https://github.com/${GITHUB_REPO}/issues/new?title=Issue with ${pathname}`;
  const featureUrl = `https://github.com/${GITHUB_REPO}/issues/new?title=Feature request: `;
  const editUrl = `https://github.com/${GITHUB_REPO}/edit/main/content${pathname}.mdx`;

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.getElementById("docs-content");
      if (!container) return;

      const elements = container.querySelectorAll("h1, h2, h3");
      const items: TocItem[] = [];

      elements.forEach((el) => {
        const text = el.textContent || "";
        if (!text.trim()) return;

        let id = el.id;
        if (!id) {
          id = slugify(text);
          el.id = id;
        }

        items.push({
          id,
          text,
          level: parseInt(el.tagName[1]),
        });
      });

      setHeadings(items);
      setActiveId("");
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="space-y-6">
      {/* On This Page Section */}
      {headings.length > 0 && (
        <nav className="space-y-0.5">
          <p className="font-medium text-sm mb-3 text-foreground/90 flex items-center gap-2">
            <HugeiconsIcon
              icon={ContentWritingIcon}
              size={15}
              className="text-muted-foreground"
            />
            On This Page
          </p>
          <div className="border-l border-border/50">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={cn(
                  "block text-sm py-1.5 pl-3 -ml-px border-l-2 transition-all duration-200",
                  "text-muted-foreground hover:text-foreground",
                  heading.level === 2 && "pl-3",
                  heading.level === 3 && "pl-6",
                  activeId === heading.id
                    ? "border-primary text-foreground font-medium"
                    : "border-transparent hover:border-muted-foreground/50"
                )}
              >
                {heading.text}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Separator */}
      <div className="h-px bg-linear-to-r from-border/50 via-border to-border/50" />

      {/* Contribute Section */}
      <nav className="space-y-0.5">
        <p className="font-medium text-sm mb-3 text-foreground/90">
          Contribute
        </p>
        <Link
          href={issueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm py-1.5 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <HugeiconsIcon
            icon={Bug01Icon}
            size={14}
            className="group-hover:text-primary transition-colors"
          />
          Report an issue
        </Link>
        <Link
          href={featureUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm py-1.5 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <HugeiconsIcon
            icon={StarIcon}
            size={14}
            className="group-hover:text-primary transition-colors"
          />
          Request a feature
        </Link>
        <Link
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm py-1.5 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <HugeiconsIcon
            icon={PencilEdit01Icon}
            size={14}
            className="group-hover:text-primary transition-colors"
          />
          Edit this page
        </Link>
      </nav>
    </div>
  );
}
