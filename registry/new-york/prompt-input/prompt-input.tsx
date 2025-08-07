"use client";
import React, { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { createContext, useContext, useState } from "react";
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

export type PromptInputTextAreaProps = {
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
  }, [value, maxHeight, disableAutoSize]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      rows={1}
      className={cn(
        "outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-primary resize-none min-h-[44px]",
        className
      )}
      disabled={disabled}
      {...props}
    />
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

export function PromptInput({
  value,
  onValueChange,
  onSubmit,
  children,
  className,
  isLoading = false,
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
      {children}
    </PromptInputContext.Provider>
  );
}
