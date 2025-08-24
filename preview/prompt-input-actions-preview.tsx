import React from "react";
import {
  PromptInput,
  PromptInputTextArea,
  PromptInputAction,
  PromptInputActions,
} from "@/registry/new-york/prompt-input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Plus, Paperclip, Camera, Images } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PromptInputActionsPreview() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <PromptInput>
        <PromptInputTextArea placeholder="What do you want to know?" />
        <PromptInputActions className="justify-between pt-2">
          <PromptInputAction tooltip="Add files and more">
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:bg-secondary/80 p-2 rounded-full cursor-pointer transition-colors duration-200">
                <Plus className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 p-2 border shadow-lg bg-background/95 backdrop-blur-sm"
                align="start"
                sideOffset={8}
              >
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer hover:bg-accent/80 transition-colors">
                  <Paperclip className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Add photos & files
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer hover:bg-accent/80 transition-colors">
                  <Camera className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Take screenshot</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer hover:bg-accent/80 transition-colors">
                  <Images className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Create image</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </PromptInputAction>
          <div className="flex">
            <PromptInputAction tooltip="submit">
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <ArrowUp className="size-5" />
              </Button>
            </PromptInputAction>
          </div>
        </PromptInputActions>
      </PromptInput>
    </div>
  );
}
