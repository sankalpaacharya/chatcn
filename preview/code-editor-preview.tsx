"use client"
import {
  CodeEditor,
  CodeEditorHeader,
  CodeEditorArea,
  CodeEditorFooter,
  CodeEditorActions,
  CodeEditorAction,
  CodeEditorDivider,
  type Language,
} from "@/components/chatcn/ai/code-editor"
import { Button } from "@/components/ui/button"
import { PlayIcon, Copy01Icon, RefreshIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const PYTHON_CODE = `numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(total)
`

const MY_LANGUAGES: Language[] = [
  { value: "python", label: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { value: "javascript", label: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { value: "typescript", label: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
]

export default function CodeEditorPreview() {
  return (
    <div className="bg-background flex items-center justify-center px-6 py-4">
      <div className="w-full max-w-4xl">
        <CodeEditor value={PYTHON_CODE} language="python" languages={MY_LANGUAGES}>
          <CodeEditorHeader>
            <CodeEditorActions>
              <CodeEditorAction tooltip="Run">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <HugeiconsIcon icon={PlayIcon} size={14} />
                </Button>
              </CodeEditorAction>
              <CodeEditorDivider />
              <CodeEditorAction tooltip="Copy">
                <Button size="sm" variant="secondary">
                  <HugeiconsIcon icon={Copy01Icon} size={14} />
                </Button>
              </CodeEditorAction>
              <CodeEditorAction tooltip="Reset">
                <Button size="sm" variant="secondary">
                  <HugeiconsIcon icon={RefreshIcon} size={14} />
                </Button>
              </CodeEditorAction>
            </CodeEditorActions>
          </CodeEditorHeader>
          <CodeEditorArea height="200px" />
          <CodeEditorFooter />
        </CodeEditor>
      </div>
    </div>
  )
}
