import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeSource from "./codesource";
import CommandBlock from "@/components/chatcn/command-tabs";

export default function Installation({ component }: { component: string }) {
  return (
    <Tabs defaultValue="cli" className="not-prose">
      <TabsList className="space-x-10 bg-transparent">
        <TabsTrigger
          value="cli"
          className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
        >
          CLI
        </TabsTrigger>
        <TabsTrigger
          value="manual"
          className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
        >
          Manual
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cli">
        <CommandBlock
          title="Install Component"
          defaultValue="pnpm"
          className="w-full"
          commands={[
            {
              label: "npm",
              command: `npx shadcn@latest add https://shadcn-collections.vercel.app/c/${component}`,
            },
            {
              label: "yarn",
              command: `yarn dlx shadcn@latest add https://shadcn-collections.vercel.app/c/${component}`,
            },
            {
              label: "pnpm",
              command: `pnpm dlx shadcn@latest add https://shadcn-collections.vercel.app/c/${component}`,
            },
            {
              label: "bun",
              command: `bunx --bun shadcn@latest add https://shadcn-collections.vercel.app/c/${component}`,
            },
          ]}
        />
      </TabsContent>
      <TabsContent value="manual" className="mt-0">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">
            1. Copy and paste the code below
          </h2>
          <CodeSource component={component} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
