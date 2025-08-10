import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

export type SourceProps = {
  href: string;
  children: React.ReactNode;
};

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
  showFavicon,
  className,
}: SourceTriggerProps) {
  return <HoverCardTrigger className="">{label}</HoverCardTrigger>;
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
  return (
    <HoverCardContent className={className}>
      <div className="space-y-3">
        <h2 className="flex">{title}</h2>
        <p>{description}</p>
      </div>
    </HoverCardContent>
  );
}
