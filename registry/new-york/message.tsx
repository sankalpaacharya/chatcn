import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { createContext, useContext } from "react";

type MessageProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;

type MessageContext = {
  disabled?: boolean;
};

const MessageContext = createContext<MessageContext>({
  disabled: false,
});

function useMessageContext() {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw Error("useMessageContext must be used within a Message");
  }
  return ctx;
}

export function Message({ children, className, ...props }: MessageProps) {
  return (
    <TooltipProvider>
      <MessageContext.Provider value={{ disabled: false }}>
        <div className={cn("flex gap-3 items-center", className)} {...props}>
          {children}
        </div>
      </MessageContext.Provider>
    </TooltipProvider>
  );
}

type MessageAvatarProps = {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
};
export function MessageAvatar({ src, alt, className }: MessageAvatarProps) {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
}

type MessageContentProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export function MessageContent({ children, className }: MessageContentProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-2 text-foreground bg-secondary break-words whitespace-normal",
        className
      )}
    >
      {children}
    </div>
  );
}

type MessageActionsProps = React.HTMLAttributes<HTMLDivElement>;

export function MessageActions({
  children,
  className,
  ...props
}: MessageActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}

type MessageActionProps = {
  className?: string;
  tooltip: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
} & React.ComponentProps<typeof Tooltip>;

export function MessageAction({
  className,
  tooltip,
  children,
  side,
  ...props
}: MessageActionProps) {
  const { disabled } = useMessageContext();
  return (
    <Tooltip {...props}>
      <TooltipTrigger
        asChild
        disabled={disabled}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent className={className}>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
