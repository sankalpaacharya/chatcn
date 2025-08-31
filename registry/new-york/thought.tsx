import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type ThoughtContentProps = {
  className?: string;
  children: React.ReactNode;
};
export function ThoughtContent({ className, children }: ThoughtContentProps) {
  return (
    <AccordionContent className={cn("", className)}>
      {children}
    </AccordionContent>
  );
}

type ThoughtProps = {
  className?: string;
  children: React.ReactNode;
};

export function Thought({ children, className }: ThoughtProps) {
  return (
    <Accordion type="single" collapsible className={cn("w-md", className)}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        {children}
      </AccordionItem>
    </Accordion>
  );
}
