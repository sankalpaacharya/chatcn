"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

type SidebarLink = {
  label: string;
  href: string;
  type: "heading" | "link";
  isNew?: boolean;
};

const sidebarLinks: SidebarLink[] = [
  { label: "Getting Started", href: "", type: "heading" },
  { label: "Introduction", href: "/docs", type: "link" },
  { label: "Components", href: "", type: "heading" },
  {
    label: "Code Block",
    href: "/docs/component/codeblock",
    type: "link",
    isNew: true,
  },
  {
    label: "Calendar",
    href: "/docs/component/calendar",
    type: "link",
    isNew: true,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isCurrentPath = (href: string) => {
    if (!href) return false;
    return pathname === href;
  };

  return (
    <>
      <div className="flex px-4 py-3 md:hidden border-b">
        <Sheet>
          <SheetTrigger className="flex absolute">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SidebarContent isCurrentPath={isCurrentPath} />
          </SheetContent>
        </Sheet>
      </div>
      <aside className="hidden md:flex h-full w-[280px] border-r bg-background">
        <SidebarContent isCurrentPath={isCurrentPath} />
      </aside>
    </>
  );
}

function SidebarContent({
  isCurrentPath,
}: {
  isCurrentPath: (href: string) => boolean;
}) {
  return (
    <div className="flex flex-col h-full">
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
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {label}
      {isNew && <Badge className="bg-green-700 text-white text-xs">New</Badge>}
    </Link>
  ) : (
    <p className="text-sm font-semibold text-muted-foreground mt-5">{label}</p>
  );
}
