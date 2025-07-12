import React from "react";
import Heatmap from "@/components/heat-map";
import CodeBlock from "@/components/code-block";
import { calendarCode } from "@/app/lib/code";

export default function page() {
  return (
    <div className="w-full max-w-7xl mx-auto py-10">
      <div className="space-y-2">
        <h2 className="md:text-5xl text-xl font-bold">Calendar</h2>
        <p className="text-muted-foreground">
          Calendar Component: Display content inside each day
        </p>
      </div>
      <div className="mt-10 space-y-10 px-4">
        <Heatmap title="Spending Calendar" />
        <h1 className=" text-2xl font-bold">Code</h1>
        <CodeBlock className=" mx-auto" code={calendarCode} lang="tsx" />
      </div>
    </div>
  );
}
