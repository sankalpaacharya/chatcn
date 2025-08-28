"use client";
import React, { ReactNode } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/registry/new-york/codeblock";
import { Suspense } from "react";

export type Demo = "codeblock";

export default function ComponentPreviewInternal({
  component,
  code,
}: {
  code: string;
  component: string;
  children?: ReactNode;
}) {
  const Component = getComponent(component);
  const { theme } = useTheme();

  return (
    <div className="overflow-hidden">
      <Tabs defaultValue="preview" className="bg-background">
        <TabsList className="space-x-10 mt-5 bg-transparent border-none p-0 h-auto flex flex-wrap">
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
              <div className="w-full max-w-full not-prose">
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
