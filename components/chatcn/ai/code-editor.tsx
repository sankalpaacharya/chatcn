"use client"
import React, { createContext, useContext, useRef, useState } from "react"
import Editor, { EditorProps } from "@monaco-editor/react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Copy01Icon, Tick02Icon, PlayIcon, RefreshIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react"

type CodeEditorContextType = {
  value: string
  language: string
  theme: string
  cursorLine: number
  cursorColumn: number
  disabled?: boolean
  setValue: (v: string) => void
  setLanguage: (l: string) => void
  setCursorPosition: (line: number, col: number) => void
  editorRef: React.RefObject<any>
}

const CodeEditorContext = createContext<CodeEditorContextType | null>(null)

function useCtx() {
  const ctx = useContext(CodeEditorContext)
  if (!ctx) throw Error("Must be used within CodeEditor")
  return ctx
}

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons"
const LANGUAGES = [
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

export type CodeEditorHeaderProps = { children?: React.ReactNode; className?: string; showLanguageSelector?: boolean }

export function CodeEditorHeader({ children, className, showLanguageSelector = true }: CodeEditorHeaderProps) {
  const { language, setLanguage } = useCtx()
  const lang = LANGUAGES.find((l) => l.value === language)

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-2 px-2 sm:px-4 py-2 bg-zinc-900 dark:bg-zinc-900 border-b border-zinc-800/60", className)}>
      {showLanguageSelector && (
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[120px] sm:w-[160px] h-8 text-xs sm:text-sm text-zinc-300 font-medium bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 transition-all">
            <span className="flex items-center gap-2">
              {lang && <img src={lang.icon} alt="" className="w-4 h-4" />}
              <span>{lang?.label || "Select"}</span>
            </span>
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            {LANGUAGES.map((l) => (
              <SelectItem key={l.value} value={l.value} className="text-sm text-zinc-300">
                <span className="flex items-center gap-2">
                  <img src={l.icon} alt="" className="w-4 h-4" />
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

export type CodeEditorButtonProps = {
  children: React.ReactNode
  className?: string
  variant?: "default" | "success"
  size?: "sm" | "md"
  loading?: boolean
  onClick?: () => void
}

export function CodeEditorButton({ children, className, variant = "default", size = "sm", loading, onClick }: CodeEditorButtonProps) {
  const variantStyles = {
    default: "bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 border-zinc-700/50",
    success: "bg-emerald-600/90 text-white hover:bg-emerald-600 border-emerald-500/50",
  }
  const sizeStyles = { sm: "h-7 px-2 text-xs gap-1", md: "h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm gap-1.5" }

  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn("inline-flex items-center justify-center font-medium rounded-md border transition-colors disabled:opacity-50", variantStyles[variant], sizeStyles[size], className)}
    >
      {loading && <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="w-3 h-3 border-2 border-current border-t-transparent rounded-full" />}
      {children}
    </motion.button>
  )
}

export function CodeEditorRunButton({ children, loadingText = "Running...", onRun, className }: { children?: React.ReactNode; loadingText?: string; onRun?: (code: string) => void | Promise<void>; className?: string }) {
  const { value } = useCtx()
  const [running, setRunning] = useState(false)
  const handleRun = async () => { setRunning(true); try { await onRun?.(value) } finally { setRunning(false) } }

  return (
    <CodeEditorButton variant="success" size="md" onClick={handleRun} loading={running} className={className}>
      <HugeiconsIcon icon={PlayIcon} size={14} />
      <motion.span key={running ? "r" : "n"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>{running ? loadingText : (children || "Run")}</motion.span>
    </CodeEditorButton>
  )
}

export function CodeEditorCopyButton({ children, copiedText = "Copied!", className }: { children?: React.ReactNode; copiedText?: string; className?: string }) {
  const { value } = useCtx()
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <CodeEditorButton onClick={handleCopy} className={className}>
      <motion.div key={copied ? "c" : "n"} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
        {copied ? <HugeiconsIcon icon={Tick02Icon} size={14} className="text-emerald-400" /> : <HugeiconsIcon icon={Copy01Icon} size={14} />}
      </motion.div>
      <motion.span key={copied ? "ct" : "nt"} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}>{copied ? copiedText : (children || "Copy")}</motion.span>
    </CodeEditorButton>
  )
}

export function CodeEditorResetButton({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { setValue } = useCtx()
  const [resetting, setResetting] = useState(false)
  const handleReset = () => { setResetting(true); setValue(""); setTimeout(() => setResetting(false), 300) }

  return (
    <CodeEditorButton onClick={handleReset} className={className}>
      <motion.div animate={resetting ? { rotate: -360 } : { rotate: 0 }} transition={{ duration: 0.3 }}><HugeiconsIcon icon={RefreshIcon} size={14} /></motion.div>
      {children || "Clear"}
    </CodeEditorButton>
  )
}

export function CodeEditorDivider() { return <div className="w-px h-5 bg-zinc-700/50 mx-1" /> }

export type CodeEditorAreaProps = { loader?: React.ReactNode; className?: string; height?: string | number; width?: string | number } & Omit<EditorProps, "value" | "onChange" | "language" | "theme">

export function CodeEditorArea({ loader, className, height = "400px", width = "100%", ...props }: CodeEditorAreaProps) {
  const { disabled, value, setValue, language, theme, editorRef, setCursorPosition } = useCtx()

  const handleMount = (editor: any, monaco: any) => {
    editorRef.current = editor
    editor.onDidChangeCursorPosition((e: any) => setCursorPosition(e.position.lineNumber, e.position.column))
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
  const { language, value, cursorLine, cursorColumn } = useCtx()
  const charCount = value.replace(/\s/g, "").length
  const lang = LANGUAGES.find((l) => l.value === language)

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-2 px-2 sm:px-4 py-2 bg-zinc-900 dark:bg-zinc-900 border-t border-zinc-800/50 text-xs font-medium", className)}>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {showStatus && <><span className="flex items-center gap-1.5"><motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} /><span className="text-zinc-300">{statusText}</span></span>{showLanguage && <span className="text-zinc-600">•</span>}</>}
        {showLanguage && <span className="flex items-center gap-1.5">{lang && <img src={lang.icon} alt="" className="w-3 h-3 opacity-70" />}<span className="text-zinc-300">{lang?.label || language}</span></span>}
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {children}
        {showLineNumber && <><span className="text-zinc-300">Ln {cursorLine}, Col {cursorColumn}</span>{showCharCount && <span className="text-zinc-600">•</span>}</>}
        {showCharCount && <span className="text-zinc-300">{charCount} chars</span>}
      </div>
    </div>
  )
}

export type CodeEditorProps = { value?: string; onValueChange?: (v: string) => void; language?: string; onLanguageChange?: (l: string) => void; theme?: string; disabled?: boolean; children: React.ReactNode; className?: string }

export function CodeEditor({ value, onValueChange, language = "python", onLanguageChange, theme = "vs-dark", disabled = false, children, className }: CodeEditorProps) {
  const [internalValue, setInternalValue] = useState(value ?? "")
  const [internalLanguage, setInternalLanguage] = useState(language)
  const [cursorLine, setCursorLine] = useState(1)
  const [cursorColumn, setCursorColumn] = useState(1)
  const editorRef = useRef<any>(null)

  const handleValue = (v: string) => { setInternalValue(v); onValueChange?.(v) }
  const handleLang = (l: string) => { setInternalLanguage(l); onLanguageChange?.(l) }
  const setCursorPosition = (line: number, col: number) => { setCursorLine(line); setCursorColumn(col) }

  return (
    <CodeEditorContext.Provider value={{ disabled, value: internalValue, setValue: handleValue, language: internalLanguage, setLanguage: handleLang, theme, cursorLine, cursorColumn, setCursorPosition, editorRef }}>
      <div className={cn("rounded-xl overflow-hidden border border-zinc-800/80 shadow-2xl shadow-black/50 bg-zinc-900 dark:bg-zinc-900", className)}>{children}</div>
    </CodeEditorContext.Provider>
  )
}

export { LANGUAGES }
