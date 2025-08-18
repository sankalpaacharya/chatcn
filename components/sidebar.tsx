"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type SidebarLink = {
  label: string;
  href: string;
  type: "heading" | "link";
  isNew?: boolean;
};

export default function Sidebar() {
  const pathname = usePathname();

  const isCurrentPath = (href: string) => {
    if (!href) return false;
    return pathname === href;
  };

  return (
    <>
      <aside className="hidden md:flex h-full w-[280px] border-r bg-background">
        <SidebarContent isCurrentPath={isCurrentPath} />
      </aside>
    </>
  );
}

export function SidebarContent({
  isCurrentPath,
}: {
  isCurrentPath: (href: string) => boolean;
}) {
  const sidebarLinks: SidebarLink[] = [
    { label: "Getting Started", href: "", type: "heading" },
    { label: "Introduction", href: "/docs", type: "link" },
    { label: "Components", href: "", type: "heading" },
    {
      label: "Code Block",
      href: "/docs/component/codeblock",
      type: "link",
      isNew: false,
    },
    {
      label: "Command Tabs",
      href: "/docs/component/commandtabs",
      type: "link",
      isNew: false,
    },
    {
      label: "Prompt Input",
      href: "/docs/component/prompt-input",
      type: "link",
      isNew: true,
    },
    {
      label: "Source",
      href: "/docs/component/source",
      type: "link",
      isNew: true,
    },
    {
      label: "Code Editor",
      href: "/docs/component/code-editor",
      type: "link",
      isNew: true,
    },
    {
      label: "Message",
      href: "/docs/component/message",
      type: "link",
      isNew: true,
    },
    {
      label: "File",
      href: "/docs/component/file",
      type: "link",
      isNew: true,
    },
    {
      label: "Calendar",
      href: "/docs/component/calendar",
      type: "link",
      isNew: false,
    },
  ];
  return (
    <div className="flex flex-col h-full">
      <Separator />
      <nav className="p-6 pt-4 space-y-1">
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.label}
            label={link.label}
            type={link.type}
            isSelected={isCurrentPath(link.href)}
            href={link.href}
            isNew={link.isNew}
          />
        ))}
      </nav>
    </div>
  );
}

function SidebarLink({
  label,
  href,
  type,
  isSelected,
  isNew = false,
}: SidebarLink & { isSelected: boolean }) {
  return type === "link" ? (
    <Link
      href={href}
      className={`flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isSelected
          ? "bg-accent"
          : "hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {label}
      {isNew && <Badge className="bg-green-700 text-white text-xs">New</Badge>}
    </Link>
  ) : (
    <p className="text-sm font-semibold text-muted-foreground mt-5">{label}</p>
  );
}
