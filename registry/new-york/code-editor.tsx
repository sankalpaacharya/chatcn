"use client";
import React, { createContext, useContext, useRef, useState } from "react";
import Editor, { EditorProps } from "@monaco-editor/react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type CodeEditorContext = {
  value: string;
  language: string;
  theme: string;
  isLoading: boolean;
  disabled?: boolean;
  setValue: (value: string) => void;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  editorRef: React.RefObject<any>;
  onFormat?: () => void;
  onExecute?: () => void;
};

const CodeEditorContext = createContext<CodeEditorContext>({
  value: "",
  language: "javascript",
  theme: "vs-dark",
  isLoading: false,
  setValue: () => {},
  setLanguage: () => {},
  setTheme: () => {},
  disabled: false,
  editorRef: React.createRef(),
});

function useCodeEditorContext() {
  const ctx = useContext(CodeEditorContext);
  if (!ctx) {
    throw Error("useCodeEditorContext must be used within a CodeEditor");
  }
  return ctx;
}

type CodeEditAreaProps = {
  loader?: React.ReactNode;
  className?: string;
  height?: string | number;
  width?: string | number;
} & Omit<EditorProps, "value" | "onChange" | "language" | "theme">;

export function CodeEditArea({
  loader,
  className,
  height = "400px",
  width = "100%",
  ...props
}: CodeEditAreaProps) {
  const { disabled, value, setValue, language, theme, editorRef, isLoading } =
    useCodeEditorContext();

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    props.onMount?.(editor, monaco);
  };

  return (
    <div className={cn("border overflow-hidden", className)}>
      <Editor
        loading={loader}
        height={height}
        width={width}
        language={language}
        theme={theme}
        value={value}
        onChange={(value) => setValue(value || "")}
        onMount={handleEditorDidMount}
        options={{
          readOnly: disabled,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          ...props.options,
        }}
        {...props}
      />
    </div>
  );
}

type CodeEditorActionsProps = React.HTMLAttributes<HTMLDivElement>;

export function CodeEditorActions({
  children,
  className,
  ...props
}: CodeEditorActionsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2 border-b bg-muted/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type CodeEditorActionProps = {
  className?: string;
  tooltip: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  onClick?: () => void;
} & React.ComponentProps<typeof Tooltip>;

export function CodeEditorAction({
  className,
  tooltip,
  children,
  side = "top",
  onClick,
  ...props
}: CodeEditorActionProps) {
  const { disabled } = useCodeEditorContext();

  return (
    <Tooltip {...props}>
      <TooltipTrigger
        asChild
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.();
        }}
      >
        <button
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            "h-8 px-2 py-1",
            "disabled:pointer-events-none disabled:opacity-50",
            className
          )}
          disabled={disabled}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side={side} className={className}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

type CodeEditorProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  language?: string;
  onLanguageChange?: (language: string) => void;
  theme?: string;
  onThemeChange?: (theme: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onFormat?: () => void;
  onExecute?: () => void;
};

export function CodeEditor({
  value,
  onValueChange,
  language = "javascript",
  onLanguageChange,
  theme = "vs-dark",
  onThemeChange,
  isLoading = false,
  disabled = false,
  children,
  className,
  onFormat,
  onExecute,
}: CodeEditorProps) {
  const [internalValue, setInternalValue] = useState(value || "");
  const [internalLanguage, setInternalLanguage] = useState(language);
  const [internalTheme, setInternalTheme] = useState(theme);
  const editorRef = useRef<any>(null);

  function handleValueChange(newValue: string) {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  }

  function handleLanguageChange(newLanguage: string) {
    setInternalLanguage(newLanguage);
    onLanguageChange?.(newLanguage);
  }

  function handleThemeChange(newTheme: string) {
    setInternalTheme(newTheme);
    onThemeChange?.(newTheme);
  }

  function handleFormat() {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
    onFormat?.();
  }

  return (
    <TooltipProvider>
      <CodeEditorContext.Provider
        value={{
          disabled,
          isLoading,
          value: value ?? internalValue,
          setValue: onValueChange ?? handleValueChange,
          language: language ?? internalLanguage,
          setLanguage: onLanguageChange ?? handleLanguageChange,
          theme: theme ?? internalTheme,
          setTheme: onThemeChange ?? handleThemeChange,
          editorRef,
          onFormat: handleFormat,
          onExecute,
        }}
      >
        <div
          className={cn(
            "border rounded-lg overflow-hidden bg-background",
            className
          )}
        >
          {children}
        </div>
      </CodeEditorContext.Provider>
    </TooltipProvider>
  );
}
