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

type State = "LOADING" | "COMPLETED" | "ERROR";

export type StateBadgeProps = {
  type: State;
  className?: string;
  children: React.ReactNode;
};

export function StateBadge({ type, className, children }: StateBadgeProps) {
  const getBadgeStyles = () => {
    switch (type) {
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
    switch (type) {
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
      {children}
    </Badge>
  );
}

export function Tool() {
  return (
    <Accordion
      type="single"
      collapsible
      className="border rounded-md px-3 w-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="no-underline hover:no-underline">
          <div className="flex gap-2">
            <LoaderCircle
              className="animate-spin flex text-muted-foreground"
              size={18}
            />
            Is it accessible?
            <StateBadge type="COMPLETED">Completed</StateBadge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="bg-transparent w-full">
              <TabsTrigger
                value="account"
                className="text-muted-foreground data-[state=active]:text-foreground px-0 text-sm data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
              >
                Table
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="text-muted-foreground data-[state=active]:text-foreground px-0 text-sm data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
              >
                JSON
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
