"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Copy01Icon,
  ComputerTerminal01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CommandBlockContextType = {
  activeCommand: string;
  setActiveCommand: (cmd: string) => void;
  copied: boolean;
  setCopied: (copied: boolean) => void;
};

const CommandBlockContext = createContext<CommandBlockContextType | null>(null);

export function useCommandBlockContext() {
  const context = useContext(CommandBlockContext);
  if (!context) {
    throw new Error(
      "useCommandBlockContext must be used within a CommandBlockContext.Provider"
    );
  }
  return context;
}

type CommandBlockProps = {
  className?: string;
  children: React.ReactNode;
};

export function CommandBlock({ className, children }: CommandBlockProps) {
  const [activeCommand, setActiveCommand] = useState("");
  const [copied, setCopied] = useState(false);

  return (
    <CommandBlockContext.Provider
      value={{ activeCommand, setActiveCommand, copied, setCopied }}
    >
      <div className={cn("w-full mx-auto", className)}>
        <div className="bg-card rounded-md border">{children}</div>
      </div>
    </CommandBlockContext.Provider>
  );
}

type CommandBlockHeaderProps = {
  children?: React.ReactNode;
};

export function CommandBlockHeader({ children }: CommandBlockHeaderProps) {
  const { activeCommand, copied, setCopied } = useCommandBlockContext();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2">
        <div className="flex items-center space-x-2">{children}</div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 sm:h-8 sm:w-8 p-0"
              onClick={() => copyToClipboard(activeCommand)}
            >
              {copied ? (
                <HugeiconsIcon
                  icon={Tick01Icon}
                  className="size-3.5 sm:size-4.5"
                />
              ) : (
                <HugeiconsIcon icon={Copy01Icon} className="size-4 sm:size-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs sm:text-sm">
              {copied ? "Copied!" : "Copy to Clipboard"}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Separator />
    </>
  );
}

interface CommandBlockTitleProps {
  children: string;
  showTerminalIcon?: boolean;
}

export function CommandBlockTitle({
  children,
  showTerminalIcon = true,
}: CommandBlockTitleProps) {
  if (!children && !showTerminalIcon) return null;

  return (
    <div className="flex items-center space-x-2">
      {showTerminalIcon && (
        <HugeiconsIcon
          icon={ComputerTerminal01Icon}
          className="text-muted-foreground size-4 sm:size-5"
        />
      )}
      {children && (
        <span className="font-medium text-sm sm:text-base">{children}</span>
      )}
    </div>
  );
}

type CommandBlockContentProps = {
  className?: string;
  command: string;
};

export function CommandBlockContent({
  className,
  command,
}: CommandBlockContentProps) {
  const { setActiveCommand } = useCommandBlockContext();

  useEffect(() => {
    setActiveCommand(command);
  }, [command, setActiveCommand]);

  return (
    <div
      className={cn(
        "px-3 sm:px-4 py-3 sm:py-4 font-mono bg-card overflow-x-auto text-primary",
        className
      )}
    >
      <p className="wrap-break-word whitespace-pre-wrap text-xs sm:text-sm md:text-base">
        {command}
      </p>
    </div>
  );
}

type CommandBlockTabHeaderProps = {
  children: React.ReactNode;
  showTerminalIcon?: boolean;
};

export function CommandBlockTabHeader({
  children,
  showTerminalIcon = true,
}: CommandBlockTabHeaderProps) {
  const { activeCommand, copied, setCopied } = useCommandBlockContext();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <TabsList className="flex w-full bg-card justify-between items-center px-1.5 sm:px-2 py-1 my-1 rounded-t-md">
        <div className="flex items-center">
          {showTerminalIcon && (
            <HugeiconsIcon
              icon={ComputerTerminal01Icon}
              className="mx-1 sm:mx-2 text-muted-foreground size-4 sm:size-5"
            />
          )}
          <div className="flex">{children}</div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 sm:h-8 sm:w-8 p-0"
              onClick={() => copyToClipboard(activeCommand)}
            >
              {copied ? (
                <HugeiconsIcon
                  icon={Tick01Icon}
                  className="size-3.5 sm:size-4.5"
                />
              ) : (
                <HugeiconsIcon icon={Copy01Icon} className="size-4 sm:size-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs sm:text-sm">
              {copied ? "Copied!" : "Copy to Clipboard"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TabsList>
      <Separator />
    </>
  );
}

type CommandBlockTabTriggerProps = {
  value: string;
  label: string;
};

export function CommandBlockTabTrigger({
  value,
  label,
}: CommandBlockTabTriggerProps) {
  return (
    <TabsTrigger
      value={value}
      className="text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3 data-[state=active]:bg-secondary data-[state=active]:text-foreground data-[state=active]:shadow-none"
    >
      {label}
    </TabsTrigger>
  );
}

type CommandBlocksTabsProps = {
  children: React.ReactNode;
  defaultValue?: string;
};

export function CommandBlocksTabs({
  children,
  defaultValue,
}: CommandBlocksTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || "");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full bg-card rounded-md border gap-0"
    >
      {children}
    </Tabs>
  );
}

type CommandBlockTabContentProps = {
  value: string;
  command: string;
};

export function CommandBlockTabContent({
  value,
  command,
}: CommandBlockTabContentProps) {
  const { setActiveCommand } = useCommandBlockContext();

  useEffect(() => {
    const handle = () => setActiveCommand(command);
    handle();
  }, [command, setActiveCommand]);

  return (
    <TabsContent
      value={value}
      className="mt-0 p-3 sm:p-4 font-mono bg-card rounded-b-md overflow-x-auto"
    >
      <p className="wrap-break-word whitespace-pre-wrap text-xs sm:text-sm md:text-base text-primary">
        {command}
      </p>
    </TabsContent>
  );
}
