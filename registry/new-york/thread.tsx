"use client";

import { useState, createContext, useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";

const ThreadContext = createContext<{ open: boolean }>({ open: false });
const useThreadContext = () => useContext(ThreadContext);

type ThreadProps = {
  children: React.ReactNode;
  className?: string;
};
export function Thread({ children, className }: ThreadProps) {
  const { open } = useThreadContext();

  return (
    <div
      className={cn(
        "group p-3 rounded-md flex gap-2 transition-colors",
        // apply hover styles if hovered OR dropdown is open
        open && "bg-accent/50 text-accent-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

//
// ThreadContent
//
type ThreadContentProps = {
  children: React.ReactNode;
  className?: string;
};
export function ThreadContent({ children, className }: ThreadContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}

//
// ThreadAction
//
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

//
// ThreadActions
//
type ThreadActionsProps = {
  children: React.ReactNode;
  className?: string;
};
export function ThreadActions({ children, className }: ThreadActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <ThreadContext.Provider value={{ open }}>
      <div
        className={cn(
          "transition-opacity",
          open ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          className
        )}
      >
        <DropdownMenu onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "p-1 rounded-md",
                open && "bg-accent text-accent-foreground"
              )}
            >
              <Ellipsis className="size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>{children}</DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ThreadContext.Provider>
  );
}
