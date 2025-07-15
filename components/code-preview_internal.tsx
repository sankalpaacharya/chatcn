"use client";
import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/registry/new-york/codeblock/codeblock";
import { Suspense } from "react";

export type Demo = "codeblock";

export default function CodePreviewInternal({
  component,
  code,
}: {
  code: string;
  component: string;
  children?: ReactNode;
}) {
  const Component = getComponent(component);

  return (
    <div className="w-full max-w-full overflow-hidden">
      <Tabs defaultValue="preview" className="bg-background w-full">
        <TabsList className="w-full sm:w-auto bg-transparent border-none p-0 h-auto flex flex-wrap">
          <TabsTrigger
            value="preview"
            className="bg-transparent border-none px-0 py-2 mr-3 sm:mr-6 border-b-2 border-transparent rounded-md text-sm sm:text-base"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="bg-transparent border-none shadow-none hover:bg-transparent px-0 py-2 border-b-2 border-transparent data-[state=active]:border-primary rounded-md text-sm sm:text-base"
          >
            Code
          </TabsTrigger>
        </TabsList>

        <Card className="border bg-background w-full overflow-hidden">
          <CardContent className="w-full p-3 sm:p-6">
            <TabsContent value="preview" className="mt-0 w-full">
              <div className="w-full min-h-[200px] sm:min-h-[300px] flex items-center justify-center overflow-auto">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center w-full h-32">
                      <p className="text-muted-foreground text-sm">
                        Loading...
                      </p>
                    </div>
                  }
                >
                  <div className="w-full max-w-full">
                    <Component />
                  </div>
                </Suspense>
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-0 w-full">
              <div className="w-full overflow-hidden">
                <CodeBlock
                  children={code}
                  lang="tsx"
                  height="400px"
                  className="w-full max-w-full"
                />
              </div>
            </TabsContent>
          </CardContent>
        </Card>
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
