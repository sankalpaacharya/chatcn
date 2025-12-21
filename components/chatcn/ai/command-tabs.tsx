"use client";
import { useState, useEffect } from "react";
import {
  Copy01Icon,
  ComputerTerminal01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PACKAGE_MANAGER_STORAGE_KEY = "chatcn-preferred-package-manager";

interface CommandItem {
  label: string;
  command: string;
}

export interface CommandBlockProps {
  title?: string;
  command?: string;
  commands?: CommandItem[];
  defaultValue?: string;
  showTerminalIcon?: boolean;
  className?: string;
}

function SingleCommandBlock({
  title,
  command,
  showTerminalIcon = true,
  className,
}: {
  title?: string;
  command: string;
  showTerminalIcon?: boolean;
  className?: string;
}) {
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
    <div className={cn("w-full mx-auto", className)}>
      <div className="bg-card rounded-md border">
        {(title || showTerminalIcon) && (
          <>
            <div className="flex items-center justify-between px-3 px-sm-4 py-1.5 py-sm-2">
              <div className="flex items-center space-x-2">
                {showTerminalIcon && (
                  <HugeiconsIcon
                    icon={ComputerTerminal01Icon}
                    className="text-muted-foreground size-4 sm:size-5"
                  />
                )}
                {title && (
                  <span className="font-medium text-sm sm:text-base">
                    {title}
                  </span>
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
                      <HugeiconsIcon
                        icon={Tick01Icon}
                        className="size-3.5 sm:size-4.5"
                      />
                    ) : (
                      <HugeiconsIcon
                        icon={Copy01Icon}
                        className="size-4 sm:size-5"
                      />
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
        )}
        <div className="px-3 sm:px-4 py-3 sm:py-4 font-mono bg-card overflow-x-auto text-primary">
          <p className="wrap-break-word whitespace-pre-wrap text-xs sm:text-sm md:text-base">
            {command}
          </p>
        </div>
      </div>
    </div>
  );
}

function MultiCommandBlock({
  commands,
  defaultValue,
  showTerminalIcon = true,
  className,
}: {
  commands: CommandItem[];
  defaultValue?: string;
  showTerminalIcon?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(
    defaultValue || commands[0]?.label
  );

  useEffect(() => {
    const savedPreference = localStorage.getItem(PACKAGE_MANAGER_STORAGE_KEY);
    if (
      savedPreference &&
      commands.some((cmd) => cmd.label === savedPreference)
    ) {
      setActiveTab(savedPreference);
    }
  }, [commands]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem(PACKAGE_MANAGER_STORAGE_KEY, value);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const activeCommand =
    commands.find((cmd) => cmd.label === activeTab)?.command || "";

  return (
    <div className={cn("w-full mx-auto", className)}>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full bg-card rounded-md border gap-0"
      >
        <TabsList className="flex w-full bg-card justify-between items-center px-1.5 sm:px-2 py-1 my-1 rounded-t-md">
          <div className="flex items-center">
            {showTerminalIcon && (
              <HugeiconsIcon
                icon={ComputerTerminal01Icon}
                className="mx-1 sm:mx-2 text-muted-foreground size-4 sm:size-5"
              />
            )}
            <div className="flex">
              {commands.map((tab) => (
                <TabsTrigger
                  key={tab.label}
                  value={tab.label}
                  className="text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3 data-[state=active]:bg-secondary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </div>
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
                  <HugeiconsIcon
                    icon={Copy01Icon}
                    className="size-4 sm:size-5"
                  />
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
        {commands.map((tab) => (
          <TabsContent
            key={tab.label}
            value={tab.label}
            className="mt-0 p-3 sm:p-4 font-mono bg-card rounded-b-md overflow-x-auto"
          >
            <p className="wrap-break-word whitespace-pre-wrap text-xs sm:text-sm md:text-base text-primary">
              {tab.command}
            </p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default function CommandBlock(props: CommandBlockProps) {
  const { command, commands, ...rest } = props;

  if (command) {
    return <SingleCommandBlock command={command} {...rest} />;
  }

  if (commands && commands.length > 0) {
    return <MultiCommandBlock commands={commands} {...rest} />;
  }

  return null;
}
