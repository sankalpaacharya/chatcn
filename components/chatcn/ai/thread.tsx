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
          "group px-3 py-2 rounded-md flex gap-2 transition-colors hover:bg-accent items-center justify-between",
          open ? "bg-accent/50" : "",
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
  return <div className={cn("truncate", className)}>{children}</div>;
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
            <Ellipsis className="size-5" />
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
