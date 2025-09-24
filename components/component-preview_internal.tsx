"use client";
import React, { ReactNode } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/registry/new-york/codeblock";
import { Suspense } from "react";
import Install from "./install";
import { cn } from "@/lib/utils";

export type Demo = "codeblock";

export default function ComponentPreviewInternal({
  component,
  code,
  isProse,
}: {
  code: string;
  component: string;
  children?: ReactNode;
  isProse?: boolean;
}) {
  const Component = getComponent(component);
  const { theme } = useTheme();
  // make the height same for both component view and code
  return (
    <div className="overflow-hidden">
      <Tabs defaultValue="preview" className="bg-background">
        <TabsList className="space-x-10 mt-5 bg-transparent w-full p-0 flex flex-wrap justify-between border-none">
          <div className="space-x-10">
            <TabsTrigger
              value="preview"
              className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
            >
              Code
            </TabsTrigger>
          </div>
          <Install code={code} component={component} />
        </TabsList>

        <TabsContent value="preview" className="mt-0 w-full">
          <div className="w-full min-h-[200px] sm:min-h-[300px] flex items-center justify-center overflow-auto border rounded-lg p-5">
            <Suspense
              fallback={
                <div className="flex items-center justify-center w-full h-32">
                  <p className="text-muted-foreground text-sm">Loading...</p>
                </div>
              }
            >
              <div
                className={cn("w-full max-w-full", isProse ? "" : "not-prose")}
              >
                <Component />
              </div>
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-0 w-full not-prose flex">
          <CodeBlock
            theme={
              theme === "dark" ? "github-dark-default" : "github-light-default"
            }
            lang="tsx"
            className="w-full"
          >
            {code}
          </CodeBlock>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getComponent(component: string) {
  return dynamic(
    () =>
      import(`../preview/${component}-preview.tsx`).then(
        (mod) => mod.default || mod
      ),
    {
      ssr: false,
    }
  ) as React.ComponentType;
}
