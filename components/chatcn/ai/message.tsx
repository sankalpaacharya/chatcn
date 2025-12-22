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
    <Avatar
      className={cn(
        "h-8 w-8 shrink-0",
        "ring-2 ring-offset-2 ring-offset-background",
        "transition-all duration-200",
        "group-hover/message:scale-105",
        variant === "user" ? "ring-blue-500/30" : "ring-muted-foreground/20",
        className
      )}
    >
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback
        className={cn(
          "text-xs font-medium",
          variant === "user"
            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
            : "bg-gradient-to-br from-muted to-muted-foreground/10 text-muted-foreground"
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
      {/* Message Bubble */}
      <div
        className={cn(
          "relative px-4 py-2.5 text-[15px] leading-relaxed",
          "break-words whitespace-pre-wrap",
          "transition-all duration-200",
          "group-hover/message:shadow-lg",
          isUser
            ? [
                // iMessage blue gradient for user
                "bg-gradient-to-br from-blue-500 via-blue-500 to-blue-600",
                "text-white",
                "rounded-2xl",
                "shadow-[0_2px_12px_rgba(59,130,246,0.25)]",
              ]
            : [
                // Glass-morphism style for AI
                "bg-secondary/80 dark:bg-secondary/60",
                "backdrop-blur-sm",
                "text-foreground",
                "rounded-2xl",
                "border border-border/50",
                "shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                "dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
              ],
          className
        )}
      >
        {children}

        {/* Subtle inner highlight for user messages */}
        {isUser && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
            }}
          />
        )}
      </div>

      {/* Read receipt indicator for user messages */}
      {isUser && (
        <div className="flex justify-end mt-1 mr-1">
          <span className="text-[10px] text-muted-foreground/60 opacity-0 group-hover/message:opacity-100 transition-opacity">
            Delivered
          </span>
        </div>
      )}
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
