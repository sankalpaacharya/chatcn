import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";

// really bad design that need to be fixed, will fix tomorrow gn buddy!!
type ThreadProps = {
  children: React.ReactNode;
  className?: string;
};
export function Thread({ children, className }: ThreadProps) {
  return (
    <div
      className={cn(
        "group hover:bg-accent/50 hover:text-accent-foreground p-3 rounded-md flex gap-2",
        className
      )}
    >
      {children}
    </div>
  );
}

type ThreadContentProps = {
  children: React.ReactNode;
  className?: string;
};
export function ThreadContent({ children, className }: ThreadContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}

type ThreadActionProps = {
  children: React.ReactNode;
  className?: string;
};
export function ThreadAction({ children, className }: ThreadActionProps) {
  return (
    <DropdownMenuItem className={cn("", className)}>
      {children}
    </DropdownMenuItem>
  );
}

type ThreadActionsProps = {
  children: React.ReactNode;
  className?: string;
};
export function ThreadActions({ children, className }: ThreadActionsProps) {
  return (
    <div className={cn("opacity-0 group-hover:opacity-100", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 rounded-md">
            <Ellipsis className="size-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{children}</DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
