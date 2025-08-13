"use client";
import {
  CodeEditor,
  CodeEditArea,
  CodeEditorActions,
  CodeEditorAction,
} from "@/registry/new-york/code-editor/code-editor";
import { Play, Copy, Download, RotateCcw, Settings } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [code, setCode] = useState(
    "def hello():\n    print('Hello, World!')\n    return 'success'"
  );
  const [language, setLanguage] = useState("python");
  const [theme, setTheme] = useState("vs-dark");

  const handleExecute = () => {
    console.log("Executing code:", code);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      console.log("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${
      language === "python" ? "py" : language === "javascript" ? "js" : "txt"
    }`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setCode("def hello():\n    print('Hello, World!')\n    return 'success'");
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "vs-dark" ? "light" : "vs-dark"));
  };

  return (
    <div>
      <CodeEditor
        value={code}
        onValueChange={setCode}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
        onExecute={handleExecute}
        className="h-[40vh]"
      >
        <CodeEditorActions>
          <CodeEditorAction tooltip="Run Code" onClick={handleExecute}>
            <Play size={16} />
          </CodeEditorAction>

          <CodeEditorAction tooltip="Copy to Clipboard" onClick={handleCopy}>
            <Copy size={16} />
          </CodeEditorAction>

          <CodeEditorAction tooltip="Download Code" onClick={handleDownload}>
            <Download size={16} />
          </CodeEditorAction>

          <CodeEditorAction tooltip="Reset Code" onClick={handleReset}>
            <RotateCcw size={16} />
          </CodeEditorAction>

          <div className="ml-auto">
            <CodeEditorAction
              tooltip={`Switch to ${
                theme === "vs-dark" ? "Light" : "Dark"
              } Theme`}
              onClick={toggleTheme}
            >
              <Settings size={16} />
            </CodeEditorAction>
          </div>
        </CodeEditorActions>

        <CodeEditArea
          loader={<div className="text-xl p-4">Loading Monaco Editor...</div>}
          height="90vh"
          width="100%"
          className="mt-0"
        />
      </CodeEditor>
    </div>
  );
}
