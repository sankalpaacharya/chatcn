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
      <aside className="hidden xl:block h-full w-62 bg-background sticky top-0">
        <SidebarContent isCurrentPath={isCurrentPath} />
      </aside>

      <div className="xl:hidden">
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
    { label: "Installation", href: "/docs/", type: "link" },
    { label: "MCP Server", href: "/docs/", type: "link" },
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
    },
    {
      label: "Markdown",
      href: "/docs/component/markdown",
      type: "link",
      isNew: true,
    },
    {
      label: "Thought",
      href: "/docs/component/thought",
      type: "link",
      isNew: true,
    },
    {
      label: "Chat Container",
      href: "/docs/component/chat-container",
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
      <nav className="px-6 py-4 space-y-2">
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
      className={`flex gap-2 items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
        isSelected
          ? "bg-accent text-accent-foreground"
          : "hover:bg-accent/50 hover:text-accent-foreground"
      }`}
    >
      {label}
      {isNew && (
        <Badge className="bg-green-700 text-white text-xs ml-1.5">New</Badge>
      )}
    </Link>
  ) : (
    <p className="text-sm font-semibold text-muted-foreground mt-6 mb-2">
      {label}
    </p>
  );
}
