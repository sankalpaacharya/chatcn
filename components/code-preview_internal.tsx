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
    <Tabs defaultValue="preview" className="bg-background">
      <TabsList className="w-md bg-transparent border-none p-0 h-auto">
        <TabsTrigger
          value="preview"
          className="bg-transparent border-none px-0 py-2 mr-6 border-b-2 border-transparent rounded-md"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="bg-transparent border-none shadow-none hover:bg-transparent  px-0 py-2 border-b-2 border-transparent data-[state=active]:border-primary rounded-md"
        >
          Code
        </TabsTrigger>
      </TabsList>
      <Card className="border bg-background">
        <CardContent className="w-full w-max-sm">
          <TabsContent value="preview">
            <Suspense fallback={<p>loading..</p>}>
              <Component />
            </Suspense>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock code={code} language="tsx" height="600" />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
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
