"use client";
import { JSX, useLayoutEffect, useState } from "react";
import { highlight } from "@/registry/new-york/codeblock/utils/shared";
import { Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calendarCode } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type CodeBlockProps = {
  initial: string;
};

export function CodeBlock({ initial }: { initial?: JSX.Element }) {
  const [nodes, setNodes] = useState(initial);

  useLayoutEffect(() => {
    void highlight(calendarCode, "tsx").then(setNodes);
  }, []);

  return (
    <ScrollArea className="relative w-full h-[600px] rounded-md ">
      <Button variant={"secondary"} className="absolute right-3 top-5">
        <Clipboard />
      </Button>
      {nodes}
    </ScrollArea>
  );
}
