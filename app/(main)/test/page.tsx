"use client";
import React, { useState } from "react";
import {
  Terminal,
  TerminalBody,
  TerminalHeader,
  TerminalInput,
  TerminalPrompt,
  TerminalBodyContent,
  TerminalProvider,
} from "@/components/chatcn/terminal";

const Page = () => {
  const [terminalState, setTerminalState] = useState<
    "normal" | "maximize" | "minimize"
  >("normal");

  return (
    <div className="flex h-screen items-center justify-center">
      <TerminalProvider>
        <Terminal className="w-md">
          <TerminalHeader className="flex gap-3 bg-card">
            <div className="size-3 bg-yellow-400 rounded-full"></div>
            <div className="size-3 bg-green-500 rounded-full"></div>
            <div className="size-3 bg-red-500 rounded-full"></div>
          </TerminalHeader>

          <TerminalBody className="bg-card h-30">
            <TerminalBodyContent className="text-gray-300" />
            <div className="flex gap-2">
              <TerminalPrompt />
              <TerminalInput />
            </div>
          </TerminalBody>
        </Terminal>
      </TerminalProvider>
    </div>
  );
};

export default Page;
