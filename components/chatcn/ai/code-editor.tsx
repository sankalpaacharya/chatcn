"use client"
import React, { createContext, useContext, useRef, useState } from "react"
import Editor, { EditorProps, Monaco } from "@monaco-editor/react"
import type { editor } from "monaco-editor"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type Language = { value: string; label: string; icon?: string }

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"
export const DEFAULT_LANGUAGES: Language[] = [
  { value: "python", label: "Python", icon: `${DEVICON}/python/python-original.svg` },
  { value: "javascript", label: "JavaScript", icon: `${DEVICON}/javascript/javascript-original.svg` },
  { value: "typescript", label: "TypeScript", icon: `${DEVICON}/typescript/typescript-original.svg` },
  { value: "java", label: "Java", icon: `${DEVICON}/java/java-original.svg` },
  { value: "cpp", label: "C++", icon: `${DEVICON}/cplusplus/cplusplus-original.svg` },
  { value: "c", label: "C", icon: `${DEVICON}/c/c-original.svg` },
  { value: "go", label: "Go", icon: `${DEVICON}/go/go-original.svg` },
  { value: "rust", label: "Rust", icon: `${DEVICON}/rust/rust-original.svg` },
  { value: "swift", label: "Swift", icon: `${DEVICON}/swift/swift-original.svg` },
  { value: "kotlin", label: "Kotlin", icon: `${DEVICON}/kotlin/kotlin-original.svg` },
]

type CodeEditorContextType = {
  value: string
  language: string
  theme: string
  languages: Language[]
  cursorLine: number
  cursorColumn: number
  disabled?: boolean
  setValue: (v: string) => void
  setLanguage: (l: string) => void
  setCursorPosition: (line: number, col: number) => void
  editorRef: React.RefObject<editor.IStandaloneCodeEditor | null>
}

const CodeEditorContext = createContext<CodeEditorContextType | null>(null)

export function useCodeEditor() {
  const ctx = useContext(CodeEditorContext)
  if (!ctx) throw Error("Must be used within CodeEditor")
  return ctx
}

export type CodeEditorHeaderProps = { children?: React.ReactNode; className?: string; showLanguageSelector?: boolean }

export function CodeEditorHeader({ children, className, showLanguageSelector = true }: CodeEditorHeaderProps) {
  const { language, setLanguage, languages } = useCodeEditor()
  const lang = languages.find((l) => l.value === language)

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-2 px-2 sm:px-4 py-2 bg-zinc-900 dark:bg-zinc-900 border-b border-zinc-800/60", className)}>
      {showLanguageSelector && (
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[120px] sm:w-[160px] h-8 text-xs sm:text-sm text-zinc-300 font-medium bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 transition-all">
            <span className="flex items-center gap-2">
              {lang?.icon && <img src={lang.icon} alt="" className="w-4 h-4" />}
              <span>{lang?.label || language}</span>
            </span>
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {languages.map((l) => (
              <SelectItem key={l.value} value={l.value} className="text-sm text-zinc-300">
                <span className="flex items-center gap-2">
                  {l.icon && <img src={l.icon} alt="" className="w-4 h-4" />}
                  {l.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <div className="flex flex-wrap items-center gap-1">{children}</div>
    </div>
  )
}

export type CodeEditorActionsProps = React.HTMLAttributes<HTMLDivElement>

export function CodeEditorActions({ children, className, ...props }: CodeEditorActionsProps) {
  return <div className={cn("flex items-center gap-1", className)} {...props}>{children}</div>
}

export type CodeEditorActionProps = { tooltip: React.ReactNode; children: React.ReactNode; className?: string; side?: "top" | "bottom" | "left" | "right" } & React.ComponentProps<typeof Tooltip>

export function CodeEditorAction({ tooltip, children, className, side = "top", ...props }: CodeEditorActionProps) {
  const { disabled } = useCodeEditor()
  return (
    <TooltipProvider>
      <Tooltip {...props}>
        <TooltipTrigger asChild disabled={disabled} onClick={(e) => e.stopPropagation()}>{children}</TooltipTrigger>
        <TooltipContent side={side} className={className}>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function CodeEditorDivider() { return <div className="w-px h-5 bg-zinc-700/50 mx-1" /> }

export type CodeEditorAreaProps = { loader?: React.ReactNode; className?: string; height?: string | number; width?: string | number } & Omit<EditorProps, "value" | "onChange" | "language" | "theme">

export function CodeEditorArea({ loader, className, height = "400px", width = "100%", ...props }: CodeEditorAreaProps) {
  const { disabled, value, setValue, language, theme, editorRef, setCursorPosition } = useCodeEditor()

  const handleMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor
    editor.onDidChangeCursorPosition((e) => setCursorPosition(e.position.lineNumber, e.position.column))
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true, noSyntaxValidation: true })
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true, noSyntaxValidation: true })
    monaco.editor.defineTheme("premium-dark", {
      base: "vs-dark", inherit: true,
      rules: [{ token: "comment", foreground: "6A9955", fontStyle: "italic" }, { token: "keyword", foreground: "C586C0" }, { token: "string", foreground: "CE9178" }, { token: "number", foreground: "B5CEA8" }, { token: "function", foreground: "DCDCAA" }, { token: "variable", foreground: "9CDCFE" }, { token: "type", foreground: "4EC9B0" }],
      colors: { "editor.background": "#0D0D0D", "editor.foreground": "#D4D4D4", "editor.lineHighlightBackground": "#1A1A1A", "editor.selectionBackground": "#264F78", "editorCursor.foreground": "#10B981", "editorLineNumber.foreground": "#4A4A4A", "editorLineNumber.activeForeground": "#858585" },
    })
    monaco.editor.setTheme("premium-dark")
    props.onMount?.(editor, monaco)
  }

  return (
    <div className={cn("relative overflow-hidden bg-[#0D0D0D]", className)}>
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-zinc-900/50 to-transparent pointer-events-none z-10" />
      <Editor
        loading={loader || <div className="flex items-center justify-center h-full bg-[#0D0D0D]"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" /></div>}
        height={height} width={width} language={language} theme={theme} value={value}
        onChange={(v) => setValue(v || "")} onMount={handleMount}
        options={{ readOnly: disabled, minimap: { enabled: false }, fontSize: 14, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", lineNumbers: "on", folding: true, lineHeight: 22, scrollBeyondLastLine: false, automaticLayout: true, padding: { top: 16, bottom: 16 }, cursorBlinking: "smooth", smoothScrolling: true, renderLineHighlight: "line", bracketPairColorization: { enabled: true }, scrollbar: { alwaysConsumeMouseWheel: false }, ...props.options }}
        {...props}
      />
    </div>
  )
}

export type CodeEditorFooterProps = { children?: React.ReactNode; className?: string; showStatus?: boolean; showLanguage?: boolean; showLineNumber?: boolean; showCharCount?: boolean; statusText?: string }

export function CodeEditorFooter({ children, className, showStatus = true, showLanguage = true, showLineNumber = true, showCharCount = true, statusText = "Ready" }: CodeEditorFooterProps) {
  const { language, value, cursorLine, cursorColumn, languages } = useCodeEditor()
  const charCount = value.replace(/\s/g, "").length
  const lang = languages.find((l) => l.value === language)

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-2 px-2 sm:px-4 py-2 bg-zinc-900 dark:bg-zinc-900 border-t border-zinc-800/50 text-xs font-medium", className)}>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {showStatus && <><span className="flex items-center gap-1.5"><motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} /><span className="text-zinc-300">{statusText}</span></span>{showLanguage && <span className="text-zinc-600">•</span>}</>}
        {showLanguage && <span className="flex items-center gap-1.5">{lang?.icon && <img src={lang.icon} alt="" className="w-3 h-3 opacity-70" />}<span className="text-zinc-300">{lang?.label || language}</span></span>}
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {children}
        {showLineNumber && <><span className="text-zinc-300">Ln {cursorLine}, Col {cursorColumn}</span>{showCharCount && <span className="text-zinc-600">•</span>}</>}
        {showCharCount && <span className="text-zinc-300">{charCount} chars</span>}
      </div>
    </div>
  )
}

export type CodeEditorProps = { value?: string; onValueChange?: (v: string) => void; language?: string; onLanguageChange?: (l: string) => void; languages?: Language[]; theme?: string; disabled?: boolean; children: React.ReactNode; className?: string }

export function CodeEditor({ value, onValueChange, language = "python", onLanguageChange, languages = DEFAULT_LANGUAGES, theme = "vs-dark", disabled = false, children, className }: CodeEditorProps) {
  const [internalValue, setInternalValue] = useState(value ?? "")
  const [internalLanguage, setInternalLanguage] = useState(language)
  const [cursorLine, setCursorLine] = useState(1)
  const [cursorColumn, setCursorColumn] = useState(1)
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const handleValue = (v: string) => { setInternalValue(v); onValueChange?.(v) }
  const handleLang = (l: string) => { setInternalLanguage(l); onLanguageChange?.(l) }
  const setCursorPosition = (line: number, col: number) => { setCursorLine(line); setCursorColumn(col) }

  return (
    <CodeEditorContext.Provider value={{ disabled, value: internalValue, setValue: handleValue, language: internalLanguage, setLanguage: handleLang, languages, theme, cursorLine, cursorColumn, setCursorPosition, editorRef }}>
      <div className={cn("rounded-xl overflow-hidden border border-zinc-800/80 shadow-2xl shadow-black/50 bg-zinc-900 dark:bg-zinc-900", className)}>{children}</div>
    </CodeEditorContext.Provider>
  )
}
