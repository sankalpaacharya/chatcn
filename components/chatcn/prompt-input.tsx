"use client";
import React, { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { createContext, useContext, useState } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type PromptInputContext = {
  value: string;
  isLoading: boolean;
  disabled?: boolean;
  setValue: (value: string) => void;
  maxHeight: string | number;
  onSubmit?: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
};

const PromptInputContext = createContext<PromptInputContext>({
  value: "",
  isLoading: false,
  setValue: () => {},
  maxHeight: 240,
  disabled: false,
  textareaRef: React.createRef<HTMLTextAreaElement>(),
});

function usePromptInputContext() {
  const ctx = useContext(PromptInputContext);
  if (!ctx) {
    throw Error("usePromptInputContext must be used within a PromptInput");
  }
  return ctx;
}

type PromptInputTextAreaProps = {
  disableAutoSize?: boolean;
} & React.ComponentProps<typeof Textarea>;

export function PromptInputTextArea({
  className,
  disableAutoSize = false,
  ...props
}: PromptInputTextAreaProps) {
  const { disabled, value, setValue, maxHeight, textareaRef } =
    usePromptInputContext();

  useEffect(() => {
    if (disableAutoSize || !textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      typeof maxHeight == "number"
        ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
        : `min(${maxHeight},${textareaRef.current.scrollHeight}px)`;
  }, [value, maxHeight, disableAutoSize, textareaRef]);

  return (
    <Textarea
      style={{ backgroundColor: "transparent" }}
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={1}
      className={cn(
        "outline-none w-full shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-primary resize-none min-h-[44px]",
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}

type PromptInputActionProps = {
  className?: string;
  tooltip: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
} & React.ComponentProps<typeof Tooltip>;

export function PromptInputAction({
  className,
  tooltip,
  children,
  ...props
}: PromptInputActionProps) {
  const { disabled } = usePromptInputContext();
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

type PromptInputProps = {
  isLoading?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  maxHeight?: number | string;
  onSubmit?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

type PromptInputActionsProps = React.HTMLAttributes<HTMLDivElement>;

export function PromptInputActions({
  children,
  className,
  ...props
}: PromptInputActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}

export function PromptInput({
  value,
  onValueChange,
  onSubmit,
  children,
  className,
  disabled = false,
  maxHeight = 240,
}: PromptInputProps) {
  const [internalValue, setInternalValue] = useState(value || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleChange(newValue: string) {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  }
  return (
    <div className={className}>
      <TooltipProvider>
        <PromptInputContext.Provider
          value={{
            disabled,
            isLoading: false,
            value: value ?? internalValue,
            setValue: onValueChange ?? handleChange,
            maxHeight,
            onSubmit,
            textareaRef,
          }}
        >
          <div
            className="border-input bg-background cursor-text rounded-3xl border p-2 shadow-xs"
            onClick={() => textareaRef.current?.focus()}
          >
            {children}
          </div>
        </PromptInputContext.Provider>
      </TooltipProvider>
    </div>
  );
}
