"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type SidebarLink = {
  label: string;
  href: string;
  type: "heading" | "link";
  isNew?: boolean;
};

const sidebarLinks: SidebarLink[] = [
  { label: "Docs", href: "/docs", type: "link" },
  {
    href: "https://chatcn-template.vercel.app",
    label: "Templates",
    type: "link",
  },
  { href: "/examples", label: "Examples", type: "link" },
  { href: "/marketplace", label: "Marketplace", type: "link" },
];

export default function MainSidebar() {
  const pathname = usePathname();

  const isCurrentPath = (href: string) => {
    if (!href) return false;
    return pathname === href;
  };

  return (
    <SidebarUI className="border-r pt-16 h-svh" side="left">
      <SidebarContent className="scrollbar-hide">
        <SidebarContentInner isCurrentPath={isCurrentPath} />
      </SidebarContent>
    </SidebarUI>
  );
}

export function SidebarContentInner({
  isCurrentPath,
  onNavigate,
}: {
  isCurrentPath: (href: string) => boolean;
  onNavigate?: () => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {sidebarLinks.map((link) => (
            <SidebarMenuItem key={link.label}>
              <SidebarMenuButton
                asChild
                isActive={isCurrentPath(link.href)}
                className="transition-all duration-200"
                onClick={onNavigate}
              >
                <Link href={link.href}>
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export { SidebarContentInner as SidebarContent };
