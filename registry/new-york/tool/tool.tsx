import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoaderCircle } from "lucide-react";

type ToolProps = {
  className?: string;
  type: "LOADING" | "COMPLETED" | "ERROR";
};

// make a badge different component

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
