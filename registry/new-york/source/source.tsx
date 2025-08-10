import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export type SourceProps = {
  href: string;
  children: React.ReactNode;
};

function getDomainFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return url;
  }
}

export function Source({ href, children }: SourceProps) {
  return (
    <HoverCard openDelay={150} closeDelay={0}>
      {children}
    </HoverCard>
  );
}

export type SourceTriggerProps = {
  label?: string | number;
  showFavicon?: boolean;
  className?: string;
};

export function SourceTrigger({
  label,
  showFavicon = true,
  className,
}: SourceTriggerProps) {
  const href = "https://google.com";
  return (
    <HoverCardTrigger asChild className="">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "bg-muted text-muted-foreground hover:bg-muted-foreground/30 hover:text-primary inline-flex h-5 max-w-32 items-center gap-1 overflow-hidden rounded-full py-0 text-xs leading-none no-underline transition-colors duration-150",
          showFavicon ? "pr-2 pl-1" : "px-1",
          className
        )}
      >
        {showFavicon && (
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(
              href
            )}`}
            alt="favicon"
            width={14}
            height={14}
            className="size-3.5 rounded-full"
          />
        )}
        <span className="truncate text-center font-normal">
          {label ?? getDomainFromUrl(href)}
        </span>
      </a>
    </HoverCardTrigger>
  );
}

export type SourceContentProps = {
  title: string;
  description: string;
  className?: string;
};

export function SourceContent({
  title,
  description,
  className,
}: SourceContentProps) {
  const href = "https://google.com";
  return (
    <HoverCardContent className={className}>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(
              href
            )}`}
            alt="favicon"
            width={14}
            height={14}
            className="size-3.5 rounded-full"
          />
          <p className="text-xs text-foreground">{getDomainFromUrl(href)}</p>
        </div>
        <h2 className="flex text-sm">{title}</h2>
        <p>{description}</p>
      </div>
    </HoverCardContent>
  );
}
