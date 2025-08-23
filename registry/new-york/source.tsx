"use client";
import React, { createContext, useContext } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

type SourceContextType = {
  href: string;
  label?: string | number;
};

const SourceContext = createContext<SourceContextType | null>(null);

function useSourceContext() {
  const context = useContext(SourceContext);
  if (!context) {
    throw new Error("useSourceContext must be used within a Source component");
  }
  return context;
}

export type SourceProps = {
  href: string;
  label?: string | number;
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

export function Source({ href, label, children }: SourceProps) {
  return (
    <SourceContext.Provider value={{ href, label }}>
      <HoverCard openDelay={150} closeDelay={0}>
        {children}
      </HoverCard>
    </SourceContext.Provider>
  );
}

export type SourceTriggerProps = {
  showFavicon?: boolean;
  className?: string;
  label?: string | number;
};

export function SourceTrigger({
  showFavicon = true,
  className,
  label: propLabel,
}: SourceTriggerProps) {
  const { href, label: contextLabel } = useSourceContext();
  const displayLabel = propLabel ?? contextLabel;

  return (
    <HoverCardTrigger asChild>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "bg-muted text-muted-foreground hover:bg-muted-foreground/30 hover:text-primary inline-flex h-5 max-w-32 items-center gap-1 overflow-hidden rounded-full py-1 text-xs leading-none no-underline transition-colors duration-150",
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
          {displayLabel ?? getDomainFromUrl(href)}
        </span>
      </a>
    </HoverCardTrigger>
  );
}

export type SourceContentProps = {
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
};

export function SourceContent({
  title,
  description,
  className,
  children,
}: SourceContentProps) {
  const { href } = useSourceContext();
  if (children)
    return <HoverCardContent className="w-80 p-4">{children}</HoverCardContent>;

  if (!title && !description) return null;

  return (
    <HoverCardContent className={cn(className, "shadow-xs")}>
      <a href={href} className="space-y-4" target="_blank">
        <div className="flex items-center gap-2">
          <img
            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(
              href
            )}`}
            alt="favicon"
            width={16}
            height={16}
            className="w-4 h-4 rounded-sm flex-shrink-0"
          />
          <p className="text-xs text-muted-foreground font-medium truncate">
            {getDomainFromUrl(href)}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground/80 leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </a>
    </HoverCardContent>
  );
}
