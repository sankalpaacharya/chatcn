"use client";
import { useState } from "react";
import {
  CodeEditor,
  CodeEditorHeader,
  CodeEditorArea,
  CodeEditorFooter,
  CodeEditorActions,
  CodeEditorAction,
  CodeEditorDivider,
  type Language,
} from "@/components/chatcn/ai/code-editor";
import { Button } from "@/components/ui/button";
import {
  PlayIcon,
  Copy01Icon,
  Tick02Icon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const CODE = `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start, end=' ')
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    
    return visited


`;

const MY_LANGUAGES: Language[] = [
  {
    value: "python",
    label: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    value: "javascript",
    label: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    value: "typescript",
    label: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
];

export default function CodeEditorPreview() {
  const [code, setCode] = useState(CODE);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // call an api or do something else
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-background flex items-center justify-center px-6 py-4">
      <div className="w-full max-w-4xl">
        <CodeEditor
          value={code}
          onValueChange={setCode}
          language="python"
          languages={MY_LANGUAGES}
        >
          <CodeEditorHeader>
            <CodeEditorActions>
              <CodeEditorAction tooltip="Run" animate={true}>
                <Button
                  size="sm"
                  className="bg-transparent border border-transparent hover:border-white hover:bg-transparent text-white"
                >
                  <HugeiconsIcon icon={PlayIcon} size={14} />
                </Button>
              </CodeEditorAction>
              <CodeEditorDivider />
              <CodeEditorAction
                tooltip={copied ? "Copied!" : "Copy"}
                animate={true}
              >
                <Button size="sm" variant="secondary" onClick={handleCopy}>
                  <HugeiconsIcon
                    icon={copied ? Tick02Icon : Copy01Icon}
                    size={14}
                    className={copied ? "text-emerald-400" : ""}
                  />
                </Button>
              </CodeEditorAction>
              <CodeEditorAction tooltip="Reset" animate={true}>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setCode("")}
                >
                  <HugeiconsIcon icon={RefreshIcon} size={14} />
                </Button>
              </CodeEditorAction>
            </CodeEditorActions>
          </CodeEditorHeader>
          <CodeEditorArea height="510px" />
          <CodeEditorFooter />
        </CodeEditor>
      </div>
    </div>
  );
}
