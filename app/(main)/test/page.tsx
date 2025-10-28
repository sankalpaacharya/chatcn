"use client";
import React from "react";
import {
  Terminal,
  TerminalBody,
  TerminalHeader,
  TerminalInput,
  TerminalPrompt,
  TerminalBodyContent,
  TerminalProvider,
  useTerminal,
} from "@/components/chatcn/system/terminal";

function TerminalContent() {
  const { setTerminalState } = useTerminal();

  return (
    <Terminal className="w-full max-w-2xl font-mono text-sm">
      <TerminalHeader className="flex items-center justify-between bg-card">
        <div className="flex gap-2">
          <button
            onClick={() => console.log("Close")}
            className="size-3 bg-red-500 rounded-full hover:brightness-110 transition-all flex items-center justify-center group"
            aria-label="Close"
          ></button>
          <button
            onClick={() =>
              setTerminalState((prev) =>
                prev === "minimize" ? "normal" : "minimize"
              )
            }
            className="size-3 bg-yellow-400 rounded-full hover:brightness-110 transition-all flex items-center justify-center group"
            aria-label="Minimize"
          ></button>
          <button
            onClick={() =>
              setTerminalState((prev) =>
                prev === "maximize" ? "normal" : "maximize"
              )
            }
            className="size-3 bg-green-500 rounded-full hover:brightness-110 transition-all flex items-center justify-center group"
            aria-label="Maximize"
          ></button>
        </div>
        <span className="text-xs opacity-60">terminal</span>
      </TerminalHeader>

      <TerminalBody className="bg-card h-[300px]">
        <TerminalBodyContent
          prompt={
            <TerminalPrompt>
              <span>~</span>
              <span>❯</span>
            </TerminalPrompt>
          }
        />
        <div className="flex gap-2">
          <TerminalPrompt>
            <span>~</span>
            <span>❯</span>
          </TerminalPrompt>
          <TerminalInput />
        </div>
      </TerminalBody>
    </Terminal>
  );
}

const Page = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <TerminalProvider initialState="normal">
        <TerminalContent />
      </TerminalProvider>
    </div>
  );
};

export default Page;
