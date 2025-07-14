"use client";
import React from "react";
import { Clipboard, SquareTerminal, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function CommandTabs() {
  const tabs = [
    { id: "pnpm", label: "pnpm", command: "pnpm add shadcn@latest add tabs" },
    { id: "npm", label: "npm", command: "npm install shadcn@latest add tabs" },
    { id: "yarn", label: "yarn", command: "yarn add shadcn@latest add tabs" },
    { id: "bun", label: "bun", command: "bunx --bun shadcn@latest add tabs" },
  ];
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="bun" className="w-full bg-card rounded gap-0">
        <TabsList className="flex w-full bg-card justify-between items-center my-1">
          <div className="flex items-center">
            <SquareTerminal className="mx-2 text-muted-foreground" size={18} />
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Clipboard size={16} className="mr-2" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{false ? "Copied!" : "Copy to Clipboard"}</p>
            </TooltipContent>
          </Tooltip>
        </TabsList>
        <Separator />
        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="mt-0 bg-card rounded-md"
          >
            <div className="relative rounded-md px-4 py-3 font-mono bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span>{tab.command}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
