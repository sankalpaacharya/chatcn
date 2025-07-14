import React from "react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type LinkItem = {
  label: string;
  href: string;
};

type Props = {
  title: string;
  description?: string;
  links?: LinkItem[];
};

export default function DocHeader({ title, description, links }: Props) {
  return (
    <div className="not-prose flex flex-col gap-4">
      <div className="space-y-2">
        <h1 className="text-5xl font-semibold">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-lg">{description}</p>
        )}
      </div>

      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Badge
                variant="secondary"
                className="font-semibold hover:bg-secondary/80 transition-colors p-1.5"
              >
                {link.label}
                <ArrowUpRight />
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
