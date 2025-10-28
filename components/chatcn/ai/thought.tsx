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
    <AccordionContent
      className={cn("text-muted-foreground px-3 border-l-2", className)}
    >
      {children}
    </AccordionContent>
  );
}

type ThoughTriggerProps = {
  className?: string;
  children: React.ReactNode;
};
export function ThoughtTrigger({ className, children }: ThoughTriggerProps) {
  return (
    <AccordionTrigger
      className={cn(
        "no-underline hover:no-underline text-muted-foreground hover:text-primary justify-start gap-2",
        className
      )}
    >
      <div className="flex gap-1 items-center">{children}</div>
    </AccordionTrigger>
  );
}

type ThoughtProps = {
  className?: string;
  children: React.ReactNode;
};

export function Thought({ children, className }: ThoughtProps) {
  return (
    <Accordion type="single" collapsible className={cn("", className)}>
      <AccordionItem value="item-1">{children}</AccordionItem>
    </Accordion>
  );
}
