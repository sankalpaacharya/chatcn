"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import {
  Home01Icon,
  Book02Icon,
  ComputerTerminal01Icon,
  UserLove01Icon,
} from "@/components/icons";
import { TwitterIcon, Github, LinkedinIcon } from "@/components/icons/social";
import { HugeiconsIcon } from "@/components/icons";
import type { IconSvgElement } from "@hugeicons/react";

export type SidebarLink = {
  label: string;
  href: string;
  isNew?: boolean;
  icon?: IconSvgElement | React.FC<React.SVGProps<SVGSVGElement>>;
};

export type SidebarGroupData = {
  label: string;
  variant?: "submenu" | "list";
  links: SidebarLink[];
};

export const sidebarGroups: SidebarGroupData[] = [
  {
    label: "Sanku",
    variant: "submenu",
    links: [
      {
        label: "Twitter",
        href: "https://twitter.com/sankalpa_02",
        icon: TwitterIcon,
      },
      {
        label: "GitHub",
        href: "https://github.com/sankalpaacharya/chatcn",
        icon: Github,
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/sankalpa02",
        icon: LinkedinIcon,
      },
    ],
  },
  {
    label: "Getting Started",
    variant: "submenu",
    links: [
      { label: "Home", href: "/docs", icon: Home01Icon },
      { label: "Introduction", href: "/docs/introduction", icon: Book02Icon },
      {
        label: "Installation",
        href: "/docs/installation",
        icon: ComputerTerminal01Icon,
      },
      {
        label: "Contributors",
        href: "/docs/contributors",
        icon: UserLove01Icon,
      },
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
      { label: "File Manager", href: "/docs/system/file-manager", isNew: true },
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
  {
    label: "Misc",
    variant: "submenu",
    links: [{ label: "Video Carousel", href: "/docs/misc/video-carousel" }],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const isCurrentPath = (href: string) => pathname === href;

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-1 h-[calc(100vh-4rem)] shrink-0 w-52"
    >
      <SidebarContent className="scrollbar-hide pb-20  px-3">
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.label} className="py-1.5 px-0">
            <SidebarGroupLabel className="px-2 mb-1 text-xs text-muted-foreground/70 uppercase tracking-wider">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent className="ml-2 pl-3 border-l border-border/40">
              <SidebarMenu className="gap-0.5">
                {group.links.map((link) => (
                  <SidebarLinkItem
                    key={link.label}
                    link={link}
                    isActive={isCurrentPath(link.href)}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <div
        className="pointer-events-none absolute left-0 bottom-0 z-10 h-24 bg-linear-to-t from-background to-transparent"
        style={{ right: "1px" }}
      />
    </Sidebar>
  );
}

function SidebarLinkItem({
  link,
  isActive,
}: {
  link: SidebarLink;
  isActive: boolean;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={link.href} className="flex items-center gap-2 font-medium">
          {link.icon &&
            (typeof link.icon === "function" ? (
              <link.icon className="size-4" />
            ) : (
              <HugeiconsIcon icon={link.icon} className="size-4" />
            ))}
          <span>{link.label}</span>
        </Link>
      </SidebarMenuButton>
      {link.isNew && (
        <SidebarMenuBadge className="bg-green-600 text-white text-[10px] px-1.5 py-0 h-4 min-w-8 z-10">
          New
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
}
