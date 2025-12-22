"use client"
import {
  CodeEditor,
  CodeEditorHeader,
  CodeEditorArea,
  CodeEditorFooter,
  CodeEditorRunButton,
  CodeEditorCopyButton,
  CodeEditorResetButton,
  CodeEditorDivider,
} from "@/components/chatcn/ai/code-editor"

const PYTHON_CODE = `numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(total)
`

export default function CodeEditorPreview() {
  const handleRun = async (code: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Executed:", code.slice(0, 50) + "...")
  }

  return (
    <div className="bg-background flex items-center justify-center px-6 py-4">
      <div className="w-full max-w-4xl">
        <CodeEditor value={PYTHON_CODE} language="python">
          <CodeEditorHeader>
            <CodeEditorRunButton onRun={handleRun} loadingText="Executing...">
              Execute
            </CodeEditorRunButton>
            <CodeEditorDivider />
            <CodeEditorCopyButton copiedText="Done!">Copy Code</CodeEditorCopyButton>
            <CodeEditorResetButton>Reset</CodeEditorResetButton>
          </CodeEditorHeader>
          <CodeEditorArea height="200px" />
          <CodeEditorFooter
            showStatus
            showLanguage
            showLineNumber
            showCharCount
            statusText="Ready"
          />
        </CodeEditor>
      </div>
    </div>
  )
}
