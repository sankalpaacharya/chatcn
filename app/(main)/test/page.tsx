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
} from "@/components/chatcn/terminal";

const Page = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <TerminalProvider>
        <Terminal className="w-full max-w-2xl">
          <TerminalHeader className="flex gap-3 bg-card">
            <div className="size-3 bg-yellow-400 rounded-full"></div>
            <div className="size-3 bg-green-500 rounded-full"></div>
            <div className="size-3 bg-red-500 rounded-full"></div>
          </TerminalHeader>

          <TerminalBody className="bg-card h-[300px]">
            <TerminalBodyContent
              prompt={
                <TerminalPrompt>
                  <span>sanku</span>
                  <span>→</span>
                </TerminalPrompt>
              }
            />
            <div className="flex gap-2">
              <TerminalPrompt>
                <span>sanku</span>
                <span>→</span>
              </TerminalPrompt>
              <TerminalInput />
            </div>
          </TerminalBody>
        </Terminal>
      </TerminalProvider>
    </div>
  );
};

export default Page;
