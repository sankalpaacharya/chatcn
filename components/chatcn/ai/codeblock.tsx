"use client"
import type { BundledLanguage } from "shiki"
import { codeToHtml } from "shiki"
import {
  Copy01Icon,
  Tick01Icon,
  SourceCodeIcon,
  SourceCodeSquareIcon,
  CommandLineIcon,
  Typescript01Icon,
  JavaScriptIcon,
  HtmlFile01Icon,
  CssFile01Icon,
  PythonIcon,
  CodeIcon,
  BashIcon
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectGroup, SelectLabel } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ============================================
// Theme Configuration
// ============================================
const DARK_THEMES = [
  { value: "github-dark-default", label: "GitHub Dark", bg: "#0d1117", accent: "#58a6ff" },
  { value: "poimandres", label: "Poimandres", bg: "#1b1e28", accent: "#add7ff" },
  { value: "vitesse-dark", label: "Vitesse Dark", bg: "#121212", accent: "#80a665" },
  { value: "one-dark-pro", label: "One Dark Pro", bg: "#282c34", accent: "#61afef" },
  { value: "dracula", label: "Dracula", bg: "#282a36", accent: "#bd93f9" },
  { value: "nord", label: "Nord", bg: "#2e3440", accent: "#88c0d0" },
  { value: "tokyo-night", label: "Tokyo Night", bg: "#1a1b26", accent: "#7aa2f7" },
  { value: "catppuccin-mocha", label: "Catppuccin", bg: "#1e1e2e", accent: "#cba6f7" },
  { value: "ayu-dark", label: "Ayu Dark", bg: "#0b0e14", accent: "#ffb454" },
  { value: "night-owl", label: "Night Owl", bg: "#011627", accent: "#7fdbca" },
  { value: "slack-dark", label: "Slack Dark", bg: "#222222", accent: "#e8912d" },
  { value: "solarized-dark", label: "Solarized Dark", bg: "#002b36", accent: "#268bd2" },
] as const

const LIGHT_THEMES = [
  { value: "github-light-default", label: "GitHub Light", bg: "#ffffff", accent: "#0969da" },
  { value: "vitesse-light", label: "Vitesse Light", bg: "#ffffff", accent: "#59873a" },
  { value: "solarized-light", label: "Solarized Light", bg: "#fdf6e3", accent: "#cb4b16" },
] as const

// Combined list for type extraction
const CODE_THEMES = [...DARK_THEMES, ...LIGHT_THEMES] as const

type CodeBlockTheme = (typeof CODE_THEMES)[number]["value"]

// ============================================
// Language Icon Mapping using Hugeicons
// ============================================
type LanguageIconType =
  | "typescript"
  | "javascript"
  | "html"
  | "css"
  | "python"
  | "json"
  | "markdown"
  | "bash"
  | "shell"
  | "tsx"
  | "jsx"
  | "default"

// Map language to hugeicon - using SourceCodeIcon as base since
// many language-specific icons are in PRO version
// Users can pass custom icons if needed
const LANGUAGE_ICON_MAP: Record<string, IconSvgElement> = {
  // TypeScript variants
  typescript: Typescript01Icon,
  ts: Typescript01Icon,
  tsx: Typescript01Icon,
  // JavaScript variants
  javascript: JavaScriptIcon,
  js: JavaScriptIcon,
  jsx: JavaScriptIcon,
  // Web languages
  html: HtmlFile01Icon,
  css: CssFile01Icon,
  // Other languages
  python: PythonIcon,
  py: PythonIcon,
  json: CodeIcon,
  markdown: SourceCodeIcon,
  md: SourceCodeIcon,
  // Terminal/Shell
  bash: BashIcon,
  shell: BashIcon,
  terminal: CommandLineIcon,
  // Default
  default: SourceCodeIcon,
}

function getLanguageIcon(lang: string): IconSvgElement {
  return LANGUAGE_ICON_MAP[lang.toLowerCase()] || SourceCodeIcon
}

// ============================================
// Context
// ============================================
// Helper to get theme config
function getThemeConfig(theme: CodeBlockTheme) {
  return CODE_THEMES.find((t) => t.value === theme) ?? CODE_THEMES[0]
}

// Helper to check if theme is dark
function isThemeDark(theme: CodeBlockTheme): boolean {
  return DARK_THEMES.some((t) => t.value === theme)
}

type CodeBlockContextType = {
  code: string
  setCode: (code: string) => void
  theme: CodeBlockTheme
  setTheme: (theme: CodeBlockTheme) => void
  lang: BundledLanguage
  highlight?: { start: number; end: number }
}

const CodeBlockContext = createContext<CodeBlockContextType | null>(null)

function useCodeBlockContext() {
  const ctx = useContext(CodeBlockContext)
  if (!ctx) {
    throw new Error(
      "CodeBlock components must be used within a CodeBlockRoot"
    )
  }
  return ctx
}

// ============================================
// CodeBlockRoot
// ============================================
type CodeBlockRootProps = {
  children: ReactNode
  height?: string
  className?: string
  code?: string
  lang?: BundledLanguage
  theme?: CodeBlockTheme
  highlight?: { start: number; end: number }
  onThemeChange?: (theme: CodeBlockTheme) => void
}

export function CodeBlockRoot({
  children,
  height = "600",
  className,
  code = "",
  lang = "tsx",
  theme: initialTheme = "github-dark-default",
  highlight,
  onThemeChange,
}: CodeBlockRootProps) {
  const [internalCode, setInternalCode] = useState(code)
  const [internalTheme, setInternalTheme] =
    useState<CodeBlockTheme>(initialTheme)

  function handleThemeChange(newTheme: CodeBlockTheme) {
    setInternalTheme(newTheme)
    onThemeChange?.(newTheme)
  }

  // Sync external code prop
  useEffect(() => {
    setInternalCode(code)
  }, [code])

  // Sync initial theme prop
  useEffect(() => {
    setInternalTheme(initialTheme)
  }, [initialTheme])

  return (
    <TooltipProvider>
      <CodeBlockContext.Provider
        value={{
          code: internalCode,
          setCode: setInternalCode,
          theme: internalTheme,
          setTheme: handleThemeChange,
          lang,
          highlight,
        }}
      >
        <div
          className={cn(
            "relative rounded-md overflow-hidden border bg-card w-full max-w-full flex flex-col",
            className
          )}
          style={{ height: "100%", maxHeight: `${height}px` }}
        >
          {children}
        </div>
      </CodeBlockContext.Provider>
    </TooltipProvider>
  )
}

// ============================================
// CodeBlockHeader
// ============================================
type CodeBlockHeaderProps = {
  icon?: LanguageIconType | ReactNode
  filename?: string
  showThemeSelector?: boolean
  showCopyButton?: boolean
  className?: string
}

export function CodeBlockHeader({
  icon,
  filename,
  showThemeSelector = false,
  showCopyButton = false,
  className,
}: CodeBlockHeaderProps) {
  const { code, theme, setTheme } = useCodeBlockContext()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Render icon based on type
  const renderIcon = () => {
    if (!icon) return null

    // If it's a ReactNode (custom icon component)
    if (React.isValidElement(icon)) {
      return icon
    }

    // If it's a string (language name), look up the hugeicon
    if (typeof icon === "string") {
      const iconComponent = getLanguageIcon(icon)
      return <HugeiconsIcon icon={iconComponent} size={16} />
    }

    return null
  }

  // Don't render if nothing to show
  if (!icon && !filename && !showThemeSelector && !showCopyButton) {
    return null
  }

  // Get current theme config for styling
  const themeConfig = getThemeConfig(theme)
  const isDarkTheme = isThemeDark(theme)

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-2 border-b backdrop-blur-sm transition-colors duration-200",
        className
      )}
      style={{
        backgroundColor: `${themeConfig.bg}ee`,
      }}
    >
      {/* Left side: Icon + Filename */}
      <div className="flex items-center gap-2">
        {icon && (
          <span
            className="flex items-center"
            style={{ color: isDarkTheme ? '#8b949e' : '#656d76' }}
          >
            {renderIcon()}
          </span>
        )}
        {filename && (
          <span
            className="text-sm font-medium"
            style={{ color: isDarkTheme ? '#e6edf3' : '#1f2328' }}
          >
            {filename}
          </span>
        )}
      </div>

      {/* Right side: Theme selector + Copy button */}
      <div className="flex items-center gap-2">
        {showThemeSelector && (
          <Select
            value={theme}
            onValueChange={(value) =>
              setTheme(value as CodeBlockTheme)
            }
          >
            <SelectTrigger
              className="h-7 w-auto gap-1.5 text-xs border-none hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                color: isDarkTheme ? '#e6edf3' : '#1f2328',
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs text-muted-foreground">Dark Themes</SelectLabel>
                {DARK_THEMES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className="size-3 rounded-full shrink-0"
                        style={{ backgroundColor: t.accent }}
                      />
                      <span>{t.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-xs text-muted-foreground">Light Themes</SelectLabel>
                {LIGHT_THEMES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className="size-3 rounded-full shrink-0"
                        style={{ backgroundColor: t.accent }}
                      />
                      <span>{t.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {showCopyButton && (
          <Tooltip>
            <TooltipTrigger
              className="p-1.5 rounded-md hover:bg-muted transition"
              onClick={handleCopy}
            >
              {copied ? (
                <HugeiconsIcon icon={Tick01Icon} size={16} />
              ) : (
                <HugeiconsIcon icon={Copy01Icon} size={16} />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy to Clipboard"}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  )
}

// ============================================
// CodeBlockContent
// ============================================
type CodeBlockContentProps = {
  children?: string
  className?: string
}

export function CodeBlockContent({
  children: childrenCode,
  className,
}: CodeBlockContentProps) {
  const { code: contextCode, theme, lang, highlight } = useCodeBlockContext()
  const [html, setHtml] = useState<string | null>(null)

  const code = childrenCode ?? contextCode

  const generateHtml = useCallback(async () => {
    if (!code) {
      setHtml("<pre><code></code></pre>")
      return
    }
    const out = await codeToHtml(code, {
      lang,
      theme,
      decorations: highlight
        ? [
          {
            start: { line: highlight.start - 1, character: 0 },
            end: { line: highlight.end, character: 0 },
            properties: { class: "bg-muted inline-block" },
          },
        ]
        : [],
    })
    setHtml(out)
  }, [code, lang, theme, highlight])

  useEffect(() => {
    generateHtml()
  }, [generateHtml])

  return (
    <div className={cn("flex-1 min-h-0 overflow-auto", className)}>
      {html == null ? (
        <div className="w-full overflow-x-auto text-sm md:text-base [&>pre]:px-4 [&>pre]:py-4">
          <pre className="bg-card text-foreground">
            <code>
              {code.split("\n").map((line, i) => (
                <span key={i} className="line">
                  {line}
                  {"\n"}
                </span>
              ))}
            </code>
          </pre>
        </div>
      ) : (
        <div
          className="w-full overflow-x-auto md:text-base text-sm [&>pre]:px-4 [&>pre]:py-4"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  )
}


// Export theme and language types for external use
export { CODE_THEMES, LANGUAGE_ICON_MAP }
export type { CodeBlockTheme, LanguageIconType }

