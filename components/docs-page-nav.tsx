"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Copy01Icon,
  Tick01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { sidebarGroups, type SidebarLink } from "@/components/sidebar";

function getAllDocLinks(): SidebarLink[] {
  const links: SidebarLink[] = [];
  for (const group of sidebarGroups) {
    if (group.label === "Sanku") continue;
    for (const link of group.links) {
      if (link.href.startsWith("/docs")) {
        links.push(link);
      }
    }
  }
  return links;
}

export default function DocsPageNav() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const allLinks = getAllDocLinks();
  const currentIndex = allLinks.findIndex((link) => link.href === pathname);

  const prevPage = currentIndex > 0 ? allLinks[currentIndex - 1] : null;
  const nextPage =
    currentIndex < allLinks.length - 1 ? allLinks[currentIndex + 1] : null;

  const handleCopy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <TooltipProvider>
      <div className="absolute right-0 top-12 flex items-center gap-1 not-prose z-10">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5 text-xs"
            >
              <HugeiconsIcon
                icon={copied ? Tick01Icon : Copy01Icon}
                className="size-3.5"
              />
              {copied ? "Copied!" : "Copy page"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy page URL</TooltipContent>
        </Tooltip>

        {/* Previous Page */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="size-8"
              disabled={!prevPage}
              asChild={!!prevPage}
            >
              {prevPage ? (
                <Link href={prevPage.href}>
                  <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
                </Link>
              ) : (
                <span>
                  <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
                </span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {prevPage ? prevPage.label : "No previous page"}
          </TooltipContent>
        </Tooltip>

        {/* Next Page */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="size-8"
              disabled={!nextPage}
              asChild={!!nextPage}
            >
              {nextPage ? (
                <Link href={nextPage.href}>
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                </Link>
              ) : (
                <span>
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                </span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {nextPage ? nextPage.label : "No next page"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
