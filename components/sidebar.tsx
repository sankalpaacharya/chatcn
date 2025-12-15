"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-background border-r h-[calc(100vh-4rem)] sticky top-16 flex-shrink-0">
        <SidebarContent isCurrentPath={isCurrentPath} />
      </aside>

      {/* Mobile Menu Toggle */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-20 left-4 z-50 shadow-md bg-background"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
          <SidebarContent
            isCurrentPath={isCurrentPath}
            onNavigate={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
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
    { label: "Home", href: "/docs", type: "link" },
    { label: "Introduction", href: "/docs/introduction", type: "link" },
    { label: "Installation", href: "/docs/installation", type: "link" },
    { label: "MCP Server", href: "/docs/mcp/", type: "link" },
    { label: "AI Components", href: "", type: "heading" },
    {
      label: "Code Block",
      href: "/docs/component/codeblock",
      type: "link",
    },
    {
      label: "Command Block",
      href: "/docs/component/command-block",
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
    },
    {
      label: "Thought",
      href: "/docs/component/thought",
      type: "link",
    },
    {
      label: "Thread",
      href: "/docs/component/thread",
      type: "link",
    },
    {
      label: "Chat Container",
      href: "/docs/component/chat-container",
      type: "link",
    },
    {
      label: "Calendar",
      href: "/docs/component/calendar",
      type: "link",
    },

    { label: "System Components", href: "", type: "heading" },
    {
      label: "Terminal",
      href: "/docs/system/terminal",
      type: "link",
    },
    {
      label: "Status Bar",
      href: "/docs/system/status-bar",
      type: "link",
    },
    {
      label: "File Manager",
      href: "/docs/system/file-manager",
      isNew: true,
      type: "link",
    },
    {
      label: "Login Manager",
      href: "/docs/system/login-manager",
      isNew: true,
      type: "link",
    },
    {
      label: "App Manager",
      href: "/docs/system/applications-manager",
      isNew: true,
      type: "link",
    },

    { label: "3D Components", href: "", type: "heading" },
    {
      label: "Model",
      href: "/docs/3d-components/model",
      type: "link",
    },
    {
      label: "Audio Visualizer",
      href: "/docs/3d-components/audio-visualizer",
      type: "link",
    },
    {
      label: "Login",
      href: "/docs/3d-components/login",
      type: "link",
    },
    {
      label: "Signup",
      href: "/docs/3d-components/signup",
      type: "link",
    },

    { label: "Tool Call UI", href: "", type: "heading", isNew: true },
    { label: "Weather", href: "/docs/component/weather", type: "link" },
    {
      label: "Email",
      href: "/docs/component/email",
      type: "link",
    },
    { label: "Charts", href: "/docs/component/charts", type: "link" },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <nav className="px-4 py-6 space-y-0.5">
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
      className={`flex gap-2 items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        isSelected
          ? "bg-accent text-accent-foreground shadow-sm"
          : "hover:bg-accent/50 hover:text-accent-foreground text-muted-foreground"
      }`}
    >
      {label}
      {isNew && (
        <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs px-1.5 py-0.5">New</Badge>
      )}
    </Link>
  ) : (
    <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mt-6 mb-2 px-3 first:mt-0">
      {label}
    </p>
  );
}
