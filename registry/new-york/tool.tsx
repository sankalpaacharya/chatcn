"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoaderCircle, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useContext, createContext, useState, useEffect } from "react";

type State = "LOADING" | "COMPLETED" | "ERROR";

type ToolContextType = {
  output?: Record<string, unknown>;
  input?: Record<string, unknown>;
  errorText?: string;
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

const ToolContext = createContext<ToolContextType | null>(null);

export function useToolContext() {
  const ctx = useContext(ToolContext);
  if (!ctx) {
    throw new Error("useToolContext must be used within a Tool");
  }
  return ctx;
}

export type StateBadgeProps = {
  className?: string;
};

export function ToolStateBadge({ className }: StateBadgeProps) {
  const { state } = useToolContext();
  const getBadgeStyles = () => {
    switch (state) {
      case "LOADING":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "COMPLETED":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "ERROR":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "";
    }
  };

  const getIcon = () => {
    switch (state) {
      case "LOADING":
        return <LoaderCircle className="animate-spin w-3.5 h-3.5" />;
      case "COMPLETED":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "ERROR":
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <Badge
      className={cn(
        "flex items-center gap-1 rounded-full",
        getBadgeStyles(),
        className
      )}
    >
      {getIcon()}
      <span className="lowercase first-letter:uppercase">{state}</span>
    </Badge>
  );
}

const getTriggerIcon = (state: string) => {
  switch (state) {
    case "LOADING":
      return (
        <LoaderCircle
          className="animate-spin text-muted-foreground"
          size={18}
        />
      );
    case "COMPLETED":
      return <CheckCircle2 className="text-green-500" size={18} />;
    case "ERROR":
      return <XCircle className="text-red-500" size={18} />;
    default:
      return null;
  }
};

type RenderTableProps = {
  data: Record<string, unknown> | undefined;
};

function RenderTable({ data }: RenderTableProps) {
  if (!data) return null;
  return (
    <div className="border p-2 px-3 rounded text-sm max-h-64 overflow-auto">
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className="border-b-1 mb-2 last:border-0 pb-2 grid grid-cols-3"
        >
          <span className="text-muted-foreground font-mono">{key}:</span>
          <pre className="col-span-2 text-sm overflow-x-hidden">
            {typeof value === "object"
              ? JSON.stringify(value, null, 2)
              : String(value)}
          </pre>
        </div>
      ))}
    </div>
  );
}

type ToolProps = {
  children?: React.ReactNode;
  output?: Record<string, unknown>;
  input?: Record<string, unknown>;
  name: string;
  errorText?: string;
  state: State;
};

export function Tool({
  children,
  output,
  input,
  errorText,
  state,
  name,
}: ToolProps) {
  const [badgeState, setbadgeState] = useState<State>(state);
  useEffect(() => {
    setbadgeState(state);
  }, [state]);
  return (
    <ToolContext.Provider
      value={{
        state: badgeState,
        setState: setbadgeState,
        output,
        input,
        errorText,
      }}
    >
      <Accordion
        type="single"
        collapsible
        className="border rounded-md px-3 w-md"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline hover:no-underline">
            <div className="flex gap-2 items-center">
              {getTriggerIcon(badgeState)}
              {name}
              {children}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex justify-center">
            <Tabs defaultValue="table" className="w-[400px]">
              <TabsList className="bg-transparent w-full">
                <TabsTrigger
                  value="table"
                  className="text-muted-foreground data-[state=active]:text-foreground px-0 text-sm data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
                >
                  Table
                </TabsTrigger>
                <TabsTrigger
                  value="json"
                  className="text-muted-foreground data-[state=active]:text-foreground px-0 text-sm data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
                >
                  JSON
                </TabsTrigger>
              </TabsList>
              <TabsContent value="table" className="space-y-4">
                <div className="space-y-2">
                  <p className="text-muted-foreground">Input</p>
                  <RenderTable data={input} />
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground">Output</p>

                  <RenderTable data={output} />
                </div>
              </TabsContent>
              <TabsContent value="json">
                <div className="space-y-2">
                  <p className="text-muted-foreground">Input</p>
                  <div className="space-y-3">
                    <pre className="whitespace-pre-wrap break-words h-28 overflow-auto border p-2 rounded text-sm b">
                      {JSON.stringify(input ?? {}, null, 2)}
                    </pre>
                    <div className="space-y-2">
                      <p className="text-muted-foreground">Output</p>
                      <pre className="whitespace-pre-wrap break-words h-72 overflow-auto border p-2 rounded text-sm">
                        {JSON.stringify(output ?? {}, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ToolContext.Provider>
  );
}
