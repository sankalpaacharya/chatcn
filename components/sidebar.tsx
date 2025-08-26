"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type SidebarLink = {
  label: string;
  href: string;
  type: "heading" | "link";
  isNew?: boolean;
};

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isCurrentPath = (href: string) => {
    if (!href) return false;
    return pathname === href;
  };

  return (
    <>
      <aside className="hidden md:flex h-full w-92 bg-background">
        <SidebarContent isCurrentPath={isCurrentPath} />
      </aside>

      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-40"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SidebarContent
              isCurrentPath={isCurrentPath}
              onNavigate={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export function SidebarContent({
  isCurrentPath,
  onNavigate,
}: {
  isCurrentPath: (href: string) => boolean;
  onNavigate?: () => void;
}) {
  const sidebarLinks: SidebarLink[] = [
    { label: "Getting Started", href: "", type: "heading" },
    { label: "Introduction", href: "/docs", type: "link" },
    { label: "Components", href: "", type: "heading" },
    {
      label: "Code Block",
      href: "/docs/component/codeblock",
      type: "link",
    },
    {
      label: "Command Tabs",
      href: "/docs/component/commandtabs",
      type: "link",
    },
    {
      label: "Prompt Input",
      href: "/docs/component/prompt-input",
      type: "link",
    },
    {
      label: "Source",
      href: "/docs/component/source",
      type: "link",
    },
    {
      label: "Code Editor",
      href: "/docs/component/code-editor",
      type: "link",
    },
    {
      label: "Message",
      href: "/docs/component/message",
      type: "link",
    },
    {
      label: "File",
      href: "/docs/component/file",
      type: "link",
    },
    {
      label: "Tool",
      href: "/docs/component/tool",
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
      <nav className="p-6 pt-4 space-y-2">
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.label}
            label={link.label}
            type={link.type}
            isSelected={isCurrentPath(link.href)}
            href={link.href}
            isNew={link.isNew}
            onNavigate={onNavigate}
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
  onNavigate,
}: SidebarLink & { isSelected: boolean; onNavigate?: () => void }) {
  return type === "link" ? (
    <Link
      href={href}
      onClick={onNavigate}
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
