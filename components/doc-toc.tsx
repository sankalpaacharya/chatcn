"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function DocTableOfContent() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const extractHeadings = () => {
      const elems = Array.from(
        document.querySelectorAll("h1, h2, h3")
      ) as HTMLElement[];
      return elems.map((el) => {
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
    };

    setHeadings(extractHeadings());

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

    // Observe all section headings
    const headingElements = document.querySelectorAll("h1, h2, h3");
    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="w-64 sticky top-16 self-start hidden xl:block pl-4">
      <div className="space-y-2 pb-8">
        <p className="font-medium text-sm mb-4">On this page</p>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            >
              <Link
                href={`#${heading.id}`}
                className={cn(
                  "text-muted-foreground hover:text-foreground block py-1",
                  activeId === heading.id && "text-foreground font-medium"
                )}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
