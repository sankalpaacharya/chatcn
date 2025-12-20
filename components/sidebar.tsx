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
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Home01Icon,
  Book02Icon,
  ServerStack03Icon,
  ComputerTerminal01Icon,
  UserLove01Icon
} from "@/components/icons";
import { TwitterIcon, Github, LinkedinIcon } from "@/components/icons/social";
import { HugeiconsIcon } from "@/components/icons";
import type { IconSvgElement } from "@hugeicons/react";

type SidebarLink = {
  label: string;
  href: string;
  isNew?: boolean;
  icon?: IconSvgElement | React.FC<React.SVGProps<SVGSVGElement>>;
};

type SidebarGroupData = {
  label: string;
  variant?: "submenu" | "list";
  links: SidebarLink[];
};

const sidebarGroups: SidebarGroupData[] = [
  {
    label: "Social",
    variant: "submenu",
    links: [
      { label: "Twitter", href: "https://twitter.com/sankalpa_02", icon: TwitterIcon },
      { label: "GitHub", href: "https://github.com/sankalpaacharya/chatcn", icon: Github },
      { label: "LinkedIn", href: "https://linkedin.com/in/sankalpa02", icon: LinkedinIcon },
    ],
  },
  {
    label: "Getting Started",
    variant: "submenu",
    links: [
      { label: "Home", href: "/docs", icon: Home01Icon },
      { label: "Introduction", href: "/docs/introduction", icon: Book02Icon },
      { label: "Installation", href: "/docs/installation", icon: ComputerTerminal01Icon },
      { label: "MCP Server", href: "/docs/mcp/", icon: ServerStack03Icon },
      { label: "Contributors", href: "/docs/contributors", icon: UserLove01Icon },
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
      { label: "Login Manager", href: "/docs/system/login-manager", isNew: true },
      { label: "App Manager", href: "/docs/system/applications-manager", isNew: true },
    ],
  },
  {
    label: "3D Components",
    variant: "submenu",
    links: [
      { label: "Model", href: "/docs/3d-components/model" },
      { label: "Audio Visualizer", href: "/docs/3d-components/audio-visualizer" },
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

export default function AppSidebar() {
  const pathname = usePathname();
  const isCurrentPath = (href: string) => pathname === href;

  return (
    <Sidebar className="border-r pt-16 h-svh">
      <SidebarContent className="scrollbar-hide">
        {sidebarGroups.map((group) =>
          group.variant === "submenu" ? (
            <SidebarGroup key={group.label}>
              <SidebarMenu className="font-medium">
                <SidebarMenuItem className="list-none">
                  <SidebarMenuButton className="px-3">
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
                      />
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          ) : (
            <SidebarGroup key={group.label}>
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
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        )}
      </SidebarContent>
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
        <Link href={link.href} className="flex items-center gap-2">
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
