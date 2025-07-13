"use client";
import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calendarCode } from "@/lib/utils";
import { Suspense } from "react";

export type Demo = "codeblock";

export default function CodePreview({
  code,
}: {
  code?: string;
  children?: ReactNode;
}) {
  const Component = getComponent("codeblock");
  return (
    <Tabs defaultValue="perview" className="bg-background">
      <TabsList className="w-md">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <Card>
        <CardContent>
          <TabsContent value="preview">
            <Suspense fallback={<p>loading..</p>}>
              <Component code={calendarCode} lang={"tsx"} />
            </Suspense>
          </TabsContent>
          <TabsContent value="code">{code}</TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}

function getComponent(component: string) {
  return dynamic(
    () => import(`../registry/new-york/${component}/${component}.tsx`),
    {
      ssr: false,
    }
  );
}
