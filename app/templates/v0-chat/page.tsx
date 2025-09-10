"use client";
import {
  PromptInput,
  PromptInputTextArea,
  PromptInputAction,
  PromptInputActions,
} from "@/registry/new-york/prompt-input";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  Plus,
  Paperclip,
  Camera,
  Images,
  MenuIcon,
  X,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/new-york/message";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// Mock chat history data
const chatHistory = [
  {
    id: 1,
    title: "Finance tracker help",
    preview: "I'm building a finance tracker, but I'm stuck on the charts...",
    date: "Today",
    active: true,
  },
  {
    id: 2,
    title: "React state management",
    preview: "What's the best way to manage state in a large React app?",
    date: "Yesterday",
    active: false,
  },
];

interface ChatHistorySidebarProps {
  className?: string;
  isMobile?: boolean;
}

function ChatHistorySidebar({
  className,
  isMobile = false,
}: ChatHistorySidebarProps) {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-base font-semibold">Recent Chats</h2>
        <Button variant="outline" size="icon" className="h-7 w-7">
          <PlusCircle className="size-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 px-2">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              className={cn(
                "w-full flex flex-col items-start gap-1 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                chat.active
                  ? "bg-secondary/80 text-secondary-foreground"
                  : "hover:bg-muted/60"
              )}
            >
              <div className="flex w-full justify-between items-center">
                <span className="font-medium line-clamp-1">{chat.title}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {chat.date}
                </span>
              </div>
              <span className="text-xs text-muted-foreground line-clamp-1">
                {chat.preview}
              </span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar for desktop */}
      <div
        className={cn(
          "hidden md:flex flex-col border-r border-border/40 bg-background/95 h-screen transition-all duration-300",
          sidebarCollapsed ? "w-12" : "w-64"
        )}
      >
        {sidebarCollapsed ? (
          // Collapsed sidebar view
          <div className="flex flex-col items-center py-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 mb-4"
              onClick={() => setSidebarCollapsed(false)}
              aria-label="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Separator className="w-8 mb-4" />
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7"
              title="New chat"
            >
              <PlusCircle className="size-4" />
            </Button>
            <ScrollArea className="flex-1 w-full mt-4">
              <div className="flex flex-col items-center gap-2 px-1">
                {chatHistory.map((chat) => (
                  <Button
                    key={chat.id}
                    variant={chat.active ? "secondary" : "ghost"}
                    size="sm"
                    className="h-7 w-7 relative"
                    title={chat.title}
                  >
                    <MessageSquare className="size-4" />
                    {chat.active && (
                      <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          // Expanded sidebar view with collapse button
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-end px-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6"
                onClick={() => setSidebarCollapsed(true)}
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <ChatHistorySidebar className="h-full" />
          </div>
        )}
      </div>

      {/* Mobile sidebar with Sheet component */}
      <div className="md:hidden">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 left-4 z-10 h-8 w-8 rounded-md"
            >
              <MenuIcon className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[270px] p-0 pt-12">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-3 right-3 h-7 w-7"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="size-4" />
            </Button>
            <ChatHistorySidebar className="h-full" isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="max-w-3xl mx-auto w-full pt-16 md:pt-12 px-4">
            <div className="pb-5">
              <h1 className="text-xl font-semibold text-center mb-1">
                Finance Tracker Help
              </h1>
              <p className="text-sm text-muted-foreground text-center mb-8">
                Today at 10:45 AM
              </p>
            </div>

            <div className="space-y-6 pb-8">
              <Message className="justify-end">
                <MessageAvatar
                  src="https://github.com/sankalpaacharya.png"
                  alt="Sankalpa Acharya"
                />
                <MessageContent>
                  Hey AI, can you help me with my project?
                </MessageContent>
              </Message>

              <Message>
                <MessageAvatar src="" alt="AI" />
                <MessageContent className="bg-transparent">
                  Of course! I'd be happy to help with your project. What
                  specifically are you working on?
                </MessageContent>
              </Message>
            </div>
          </div>
        </div>
        <div
          className={cn(
            " bg-background/95 p-4",
            sidebarCollapsed ? "md:ml-12" : "md:ml-64"
          )}
        >
          <PromptInput className="max-w-2xl mx-auto">
            <PromptInputTextArea placeholder="Message AI..." />
            <PromptInputActions className="justify-between pt-2">
              <PromptInputAction tooltip="Add files">
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:bg-muted p-1.5 rounded-md cursor-pointer transition-colors">
                    <Plus className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 p-2 border shadow-md bg-background/95 backdrop-blur-sm"
                    align="start"
                    sideOffset={8}
                  >
                    <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted">
                      <Paperclip className="size-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium">Attach file</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted">
                      <Camera className="size-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium">
                        Take screenshot
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted">
                      <Images className="size-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium">Create image</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </PromptInputAction>
              <div className="flex">
                <PromptInputAction tooltip="Send message">
                  <Button
                    variant="default"
                    size="sm"
                    className="h-8 w-8 rounded-full"
                  >
                    <ArrowUp className="size-3.5" />
                  </Button>
                </PromptInputAction>
              </div>
            </PromptInputActions>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
