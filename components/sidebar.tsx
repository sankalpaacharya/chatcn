"use client";
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

type SidebarLink = {
  label: string;
  href: string;
};

const sidebarLinks = [{ label: "Calendar", href: "/doc/component/calendar" }];

export default function Sidebar() {
  const pathname = usePathname();

  const isCurrentPath = (label: string) => {
    return label.toLowerCase() === pathname.split("/")[3]?.toLowerCase();
  };

  return (
    <aside className="h-full w-[280px] border-r bg-background">
      <div className="p-6 pb-4">
        <h2 className="text-lg font-semibold tracking-tight">Components</h2>
        <p className="text-sm text-muted-foreground">
          Reusable components built using shadcn
        </p>
      </div>
      <Separator />
      <nav className="p-6 pt-4 space-y-1">
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.href}
            label={link.label}
            isSelected={isCurrentPath(link.label)}
            href={link.href}
          />
        ))}
      </nav>
    </aside>
  );
}

function SidebarLink({
  label,
  href,
  isSelected,
}: SidebarLink & { isSelected: boolean }) {
  return (
    <Link
      href={href}
      className={`
        flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
        ${
          isSelected
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }
      `}
    >
      {label}
      <Badge className="bg-green-700 text-white">New</Badge>
    </Link>
  );
}
