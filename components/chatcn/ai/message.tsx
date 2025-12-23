"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { createContext, useContext } from "react";

type MessageVariant = "user" | "ai";

type MessageProps = {
  children: React.ReactNode;
  className?: string;
  variant?: MessageVariant;
} & React.HTMLProps<HTMLDivElement>;

type MessageContext = {
  disabled?: boolean;
  variant: MessageVariant;
};

const MessageContext = createContext<MessageContext>({
  disabled: false,
  variant: "ai",
});

function useMessageContext() {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw Error("useMessageContext must be used within a Message");
  }
  return ctx;
}

export function Message({
  children,
  className,
  variant = "ai",
  ...props
}: MessageProps) {
  return (
    <TooltipProvider>
      <MessageContext.Provider value={{ disabled: false, variant }}>
        <div
          className={cn(
            "flex gap-3 items-end group/message",
            "animate-in fade-in-0 slide-in-from-bottom-2 duration-300 ease-out",
            variant === "user" && "flex-row-reverse",
            className
          )}
          {...props}
        >
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

export function MessageAvatar({
  src,
  alt,
  fallback,
  className,
}: MessageAvatarProps) {
  const { variant } = useMessageContext();

  return (
    <Avatar className={cn("h-8 w-8 shrink-0", className)}>
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback
        className={cn(
          "text-xs font-medium",
          variant === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {fallback || alt?.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

type MessageContentProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export function MessageContent({ children, className }: MessageContentProps) {
  const { variant } = useMessageContext();
  const isUser = variant === "user";

  return (
    <div className="relative max-w-[80%]">
      <div
        className={cn(
          "relative px-4 py-2.5 text-[15px] leading-relaxed",
          "wrap-break-word whitespace-pre-wrap",
          "rounded-2xl",
          isUser ? "bg-blue-500 text-white" : "bg-secondary text-foreground",
          className
        )}
      >
        {children}
      </div>
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
