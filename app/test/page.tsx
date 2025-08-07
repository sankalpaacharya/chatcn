import React from "react";
import {
  PromptInput,
  PromptInputTextArea,
  PromptInputAction,
  PromptInputActions,
} from "@/registry/new-york/prompt-input/prompt-input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function Page() {
  return (
    <div className="flex justify-center py-10">
      <div className="w-xl">
        <PromptInput>
          <PromptInputTextArea placeholder="What do you want to know?" />
          <PromptInputActions className="justify-end pt-2">
            <PromptInputAction tooltip="submit">
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <ArrowUp className="size-5" />
              </Button>
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
      </div>
    </div>
  );
}
