import React from "react";
import {
  CommandBlock,
  CommandBlockHeader,
  CommandBlockContent,
  CommandBlockTitle,
} from "@/registry/new-york/command-block";

export default function Page() {
  return (
    <div className="flex justify-center mt-10 w-xl mx-auto">
      <CommandBlock command="please install this command">
        <CommandBlockHeader>
          <CommandBlockTitle showTerminalIcon>
            Install dependency
          </CommandBlockTitle>
        </CommandBlockHeader>
        <CommandBlockContent />
      </CommandBlock>
    </div>
  );
}
