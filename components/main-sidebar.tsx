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

export default function MainSidebar() {
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
    {  label: "Docs",href: "/docs", type: "link" },
    { href: "https://chatcn-template.vercel.app", label: "Templates", type: "link"  },
    { href: "/examples", label: "Examples", type: "link"  },
    { href: "/marketplace", label: "Marketplace", type: "link" }
  ];

  return (
    <div className="flex flex-col h-full overflow-auto pb-10 scrollbar-hide">
      <nav className="px-6 py-4 space-y-1">
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
    <p className="text-sm font-medium text-muted-foreground mt-6 mb-2">
      {label}
    </p>
  );
}
