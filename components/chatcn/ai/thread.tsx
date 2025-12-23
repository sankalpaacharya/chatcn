"use client";
import { useState, createContext, useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, Message01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

const ThreadContext = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
}>({
  open: false,
  setOpen: () => {},
});
const useThreadContext = () => useContext(ThreadContext);

type ThreadProps = {
  children: React.ReactNode;
  className?: string;
};

export function Thread({ children, className }: ThreadProps) {
  const [open, setOpen] = useState(false);

  return (
    <ThreadContext.Provider value={{ open, setOpen }}>
      <div
        className={cn(
          "group flex items-center gap-2.5 px-2.5 py-2 rounded-lg",
          "cursor-pointer select-none",
          "transition-colors duration-150",
          "hover:bg-accent",
          open && "bg-accent",
          className
        )}
      >
        {children}
      </div>
    </ThreadContext.Provider>
  );
}

export function ThreadContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 flex-1 min-w-0">
      <HugeiconsIcon
        icon={Message01Icon}
        className="shrink-0 size-4 text-muted-foreground"
      />
      <span className={cn("truncate text-sm text-foreground", className)}>
        {children}
      </span>
    </div>
  );
}

export function ThreadAction({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DropdownMenuItem className={cn("p-2", className)}>
      {children}
    </DropdownMenuItem>
  );
}

export function ThreadActions({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen } = useThreadContext();

  return (
    <div
      className={cn(
        "transition-opacity",
        open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}
    >
      <DropdownMenu onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn("p-1 rounded-md", open && "text-accent-foreground")}
          >
            <HugeiconsIcon icon={MoreHorizontalIcon} className="size-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          className={cn(
            "w-56 p-2 border shadow-sm bg-background/95 backdrop-blur-sm",
            className
          )}
        >
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
