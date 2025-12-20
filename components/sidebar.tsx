"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";


type SidebarLink = {
  label: string;
  href: string;
  isNew?: boolean;
};

type SidebarGroupData = {
  label: string;
  variant?: "submenu" | "list";
  links: SidebarLink[];
};


const sidebarGroups: SidebarGroupData[] = [
  {
    label: "Getting Started",
    variant: "submenu",
    links: [
      { label: "Home", href: "/docs" },
      { label: "Introduction", href: "/docs/introduction" },
      { label: "Installation", href: "/docs/installation" },
      { label: "MCP Server", href: "/docs/mcp/" },
    ],
  },
  {
    label: "AI Components",
    variant: "submenu",
    links: [
      { label: "Code Block", href: "/docs/component/codeblock" },
      { label: "Command Block", href: "/docs/component/command-block" },
      { label: "Prompt Input", href: "/docs/component/prompt-input" },
      { label: "Source", href: "/docs/component/source" },
      { label: "Code Editor", href: "/docs/component/code-editor" },
      { label: "Message", href: "/docs/component/message" },
      { label: "File", href: "/docs/component/file" },
      { label: "Tool", href: "/docs/component/tool" },
      { label: "Markdown", href: "/docs/component/markdown" },
      { label: "Thought", href: "/docs/component/thought" },
      { label: "Thread", href: "/docs/component/thread" },
      { label: "Chat Container", href: "/docs/component/chat-container" },
      { label: "Calendar", href: "/docs/component/calendar" },
    ],
  },
  {
    label: "System Components",
    variant: "submenu",
    links: [
      { label: "Terminal", href: "/docs/system/terminal" },
      { label: "Status Bar", href: "/docs/system/status-bar" },
      {
        label: "File Manager",
        href: "/docs/system/file-manager",
        isNew: true,
      },
      {
        label: "Login Manager",
        href: "/docs/system/login-manager",
        isNew: true,
      },
      {
        label: "App Manager",
        href: "/docs/system/applications-manager",
        isNew: true,
      },
    ],
  },
  {
    label: "3D Components",
    variant: "submenu",
    links: [
      { label: "Model", href: "/docs/3d-components/model" },
      {
        label: "Audio Visualizer",
        href: "/docs/3d-components/audio-visualizer",
      },
      { label: "Login", href: "/docs/3d-components/login" },
      { label: "Signup", href: "/docs/3d-components/signup" },
    ],
  },
  {
    label: "Tool Call UI",
    variant: "submenu",
    links: [
      { label: "Weather", href: "/docs/component/weather" },
      { label: "Email", href: "/docs/component/email" },
      { label: "Charts", href: "/docs/component/charts" },
    ],
  },
];


export default function Sidebar() {
  const pathname = usePathname();

  const isCurrentPath = (href: string) => pathname === href;

  return (
    <SidebarUI className="border-r pt-16 h-svh">
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
    <>
      {sidebarGroups.map((group) =>
        group.variant === "submenu" ? (
          <SidebarSubmenuGroup
            key={group.label}
            group={group}
            isCurrentPath={isCurrentPath}
            onNavigate={onNavigate}
          />
        ) : (
          <SidebarListGroup
            key={group.label}
            group={group}
            isCurrentPath={isCurrentPath}
            onNavigate={onNavigate}
          />
        )
      )}
    </>
  );
}


function SidebarSubmenuGroup({
  group,
  isCurrentPath,
  onNavigate,
}: {
  group: SidebarGroupData;
  isCurrentPath: (href: string) => boolean;
  onNavigate?: () => void;
}) {
  return (
    <SidebarGroup className="py-1">
      <SidebarMenuItem className="list-none">
        <SidebarMenuButton className="px-3" tooltip={group.label}>
          <span className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
            {group.label}
          </span>
        </SidebarMenuButton>

        <SidebarMenuSub className="ml-2 border-l border-muted/50 mt-1">
          {group.links.map((link) => (
            <SidebarLinkItem
              key={link.label}
              link={link}
              isActive={isCurrentPath(link.href)}
              onNavigate={onNavigate}
              sub
            />
          ))}
        </SidebarMenuSub>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}


function SidebarListGroup({
  group,
  isCurrentPath,
  onNavigate,
}: {
  group: SidebarGroupData;
  isCurrentPath: (href: string) => boolean;
  onNavigate?: () => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
        {group.label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {group.links.map((link) => (
            <SidebarLinkItem
              key={link.label}
              link={link}
              isActive={isCurrentPath(link.href)}
              onNavigate={onNavigate}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}


function SidebarLinkItem({
  link,
  isActive,
  onNavigate,
  sub,
}: {
  link: SidebarLink;
  isActive: boolean;
  onNavigate?: () => void;
  sub?: boolean;
}) {
  const Button = sub ? SidebarMenuSubButton : SidebarMenuButton;
  const Item = sub ? SidebarMenuSubItem : SidebarMenuItem;

  return (
    <Item>
      <Button asChild isActive={isActive} onClick={onNavigate}>
        <Link href={link.href}>
          <span>{link.label}</span>
        </Link>
      </Button>

      {link.isNew && (
        <SidebarMenuBadge className="bg-green-600 text-white text-[10px] px-1.5 py-0 h-4 min-w-8 z-10">
          New
        </SidebarMenuBadge>
      )}
    </Item>
  );
}
