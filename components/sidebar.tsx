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
};

const sidebarLinks: SidebarLink[] = [
  { label: "Calendar", href: "/doc/component/calendar" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isCurrentPath = (label: string) =>
    label.toLowerCase() === pathname.split("/")[3]?.toLowerCase();

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
  isCurrentPath: (label: string) => boolean;
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
            key={link.href}
            label={link.label}
            isSelected={isCurrentPath(link.label)}
            href={link.href}
          />
        ))}
      </nav>
    </div>
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
      className={`flex gap-2 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isSelected
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {label}
      <Badge className="bg-green-700 text-white">New</Badge>
    </Link>
  );
}
