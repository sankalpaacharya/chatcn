"use client";
import React, { createContext, useContext, useState } from "react";
import { Clipboard, SquareTerminal, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ------------------ Context ------------------

type CommandBlockContextType = {
  command: string;
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

// ------------------ CommandBlock ------------------

type CommandBlockProps = {
  className?: string;
  children: React.ReactNode;
  command: string;
};

export function CommandBlock({
  className,
  children,
  command,
}: CommandBlockProps) {
  return (
    <CommandBlockContext.Provider value={{ command }}>
      <div className={cn("w-full mx-auto", className)}>
        <div className="bg-card rounded-md border">{children}</div>
      </div>
    </CommandBlockContext.Provider>
  );
}

// ------------------ Header ------------------

type CommandBlockHeaderProps = {
  children: React.ReactNode;
};

export function CommandBlockHeader({ children }: CommandBlockHeaderProps) {
  return <>{children}</>;
}

// ------------------ Title ------------------

interface CommandBlockTitleProps {
  children: string;
  showTerminalIcon?: boolean;
}

export function CommandBlockTitle({
  children,
  showTerminalIcon,
}: CommandBlockTitleProps) {
  if (!children && !showTerminalIcon) return null;

  const { command } = useCommandBlockContext();
  const [copied, setCopied] = useState(false);

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
    <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2">
      <div className="flex items-center space-x-2">
        {showTerminalIcon && (
          <SquareTerminal className="text-muted-foreground size-4 sm:size-5" />
        )}
        {children && (
          <span className="font-medium text-sm sm:text-base">{children}</span>
        )}
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
            onClick={() => copyToClipboard(command)}
          >
            {copied ? (
              <Check className="size-3.5 sm:size-4.5" />
            ) : (
              <Clipboard className="size-4 sm:size-5" />
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
  );
}

// ------------------ Content ------------------

type CommandBlockContentProps = {
  className?: string;
};

export function CommandBlockContent({ className }: CommandBlockContentProps) {
  const { command } = useCommandBlockContext();

  return (
    <div className={cn("w-full mx-auto", className)}>
      <div className="bg-card rounded-md border">
        <div className="px-3 sm:px-4 py-3 sm:py-4 font-mono bg-card overflow-x-auto text-primary">
          <p className="break-words whitespace-pre-wrap text-xs sm:text-sm md:text-base">
            {command}
          </p>
        </div>
      </div>
    </div>
  );
}
