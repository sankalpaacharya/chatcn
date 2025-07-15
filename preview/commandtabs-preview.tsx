import React from "react";
import CommandBlock from "@/registry/new-york/command-tabs/command-tabs";

export default function CommandTabsDemo() {
  const packageManagerCommands = [
    { id: "pnpm", label: "pnpm", command: "pnpm add shadcn@latest add tabs" },
    { id: "npm", label: "npm", command: "npm install shadcn@latest add tabs" },
    { id: "yarn", label: "yarn", command: "yarn add shadcn@latest add tabs" },
    { id: "bun", label: "bun", command: "bunx --bun shadcn@latest add tabs" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Single Command Example</h3>
        <CommandBlock
          title="Install Dependencies"
          command="npm install react react-dom"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Single Command (No Title)
        </h3>
        <CommandBlock command="git clone https://github.com/user/repo.git" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Multi-Tab Commands</h3>
        <CommandBlock commands={packageManagerCommands} defaultValue="bun" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Multi-Tab (No Terminal Icon)
        </h3>
        <CommandBlock
          commands={packageManagerCommands}
          defaultValue="npm"
          showTerminalIcon={false}
        />
      </div>
    </div>
  );
}
