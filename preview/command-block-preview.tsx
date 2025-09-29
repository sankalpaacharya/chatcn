"use client";
import React from "react";
import {
  CommandBlock,
  CommandBlockHeader,
  CommandBlockTitle,
  CommandBlockContent,
  CommandBlockTabHeader,
  CommandBlockTabTrigger,
  CommandBlockTabContent,
  CommandBlocksTabs,
} from "@/registry/new-york/command-block";

export default function CommandBlockDemoPage() {
  const packageManagerCommands = [
    { label: "pnpm", command: "pnpm add shadcn@latest add tabs" },
    { label: "npm", command: "npm install shadcn@latest add tabs" },
    { label: "yarn", command: "yarn add shadcn@latest add tabs" },
    { label: "bun", command: "bunx --bun shadcn@latest add tabs" },
  ];

  return (
    <div className="space-y-12 p-6 max-w-4xl mx-auto">
      {/* 1️⃣ Single Command Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Single Command Example</h3>
        <CommandBlock>
          <CommandBlockHeader>
            <CommandBlockTitle showTerminalIcon>
              Install Dependencies
            </CommandBlockTitle>
          </CommandBlockHeader>
          <CommandBlockContent command="npm install react react-dom" />
        </CommandBlock>
      </div>
      {/* 2️⃣ Single Command (No Terminal Icon) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Single Command (No Terminal Icon)
        </h3>
        <CommandBlock>
          <CommandBlockHeader>
            <CommandBlockTitle showTerminalIcon={false}>
              Clone Repository
            </CommandBlockTitle>
          </CommandBlockHeader>
          <CommandBlockContent command="git clone https://github.com/user/repo.git" />
        </CommandBlock>
      </div>
      {/* 3️⃣ Multi-Tab Commands */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Multi-Tab Commands</h3>
        <CommandBlock>
          <CommandBlocksTabs defaultValue="bun">
            <CommandBlockTabHeader showTerminalIcon>
              {packageManagerCommands.map((cmd) => (
                <CommandBlockTabTrigger
                  key={cmd.label}
                  value={cmd.label}
                  label={cmd.label}
                />
              ))}
            </CommandBlockTabHeader>
            {packageManagerCommands.map((cmd) => (
              <CommandBlockTabContent
                key={cmd.label}
                value={cmd.label}
                command={cmd.command}
              />
            ))}
          </CommandBlocksTabs>
        </CommandBlock>
      </div>
      {/* 4️⃣ Multi-Tab Commands (No Terminal Icon) */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Multi-Tab Commands (No Terminal Icon)
        </h3>
        <CommandBlock>
          <CommandBlocksTabs defaultValue="npm">
            <CommandBlockTabHeader showTerminalIcon={false}>
              {packageManagerCommands.map((cmd) => (
                <CommandBlockTabTrigger
                  key={cmd.label}
                  value={cmd.label}
                  label={cmd.label}
                />
              ))}
            </CommandBlockTabHeader>
            {packageManagerCommands.map((cmd) => (
              <CommandBlockTabContent
                key={cmd.label}
                value={cmd.label}
                command={cmd.command}
              />
            ))}
          </CommandBlocksTabs>
        </CommandBlock>
      </div>
    </div>
  );
}
