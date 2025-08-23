"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Heading = {
  id: string;
  text: string;
  level: number;
};
// i will build this myself tomorrow
export default function DocTableOfContent() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const elems = Array.from(
      document.querySelectorAll("h1, h2, h3")
    ) as HTMLElement[];

    const mapped = elems.map((el) => {
      if (!el.id) {
        el.id = el.innerText
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
      }
      return {
        id: el.id,
        text: el.innerText,
        level: parseInt(el.tagName[1]),
      };
    });

    setHeadings(mapped);
  }, []);

  return (
    <div>
      <h2 className="text-sm font-medium mb-2">On this page</h2>
      <ul className="space-y-1 text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <Link
              href={`#${h.id}`}
              className={cn(
                "block hover:text-primary transition-colors",
                h.level === 1 && "font-semibold",
                h.level === 2 && "pl-4 text-muted-foreground",
                h.level === 3 && "pl-8 text-muted-foreground/70"
              )}
            >
              {h.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
