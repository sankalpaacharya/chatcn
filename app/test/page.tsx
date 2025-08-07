import React from "react";
import {
  PromptInput,
  PromptInputTextArea,
} from "@/registry/new-york/prompt-input/prompt-input";

export default function Page() {
  return (
    <div className="flex w-full justify-center py-10">
      <PromptInput>
        <PromptInputTextArea placeholder="hello" />
      </PromptInput>
    </div>
  );
}
