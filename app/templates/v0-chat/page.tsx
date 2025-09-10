import {
  PromptInput,
  PromptInputTextArea,
  PromptInputAction,
  PromptInputActions,
} from "@/registry/new-york/prompt-input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Plus, Paperclip, Camera, Images } from "lucide-react";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/new-york/message";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow max-w-3xl mx-auto space-y-5 pt-10">
        <Message className="justify-end">
          <MessageAvatar
            src="https://github.com/sankalpaacharya.png"
            alt="Sankalpa Acharya"
          />
          <MessageContent>
            Hey AI, can you help me with my project?
          </MessageContent>
        </Message>

        <Message>
          <MessageAvatar src="" alt="AI" />
          <MessageContent className="bg-transparent">
            Of course! What are you working on right now?
          </MessageContent>
        </Message>

        <Message className="justify-end">
          <MessageAvatar
            src="https://github.com/sankalpaacharya.png"
            alt="Sankalpa Acharya"
          />
          <MessageContent>
            I’m building a finance tracker, but I’m stuck on the charts.
          </MessageContent>
        </Message>

        <Message>
          <MessageAvatar src="" alt="AI" />
          <MessageContent className="bg-transparent">
            Got it. Are you using Recharts or Chart.js?
          </MessageContent>
        </Message>

        <Message className="justify-end">
          <MessageAvatar
            src="https://github.com/sankalpaacharya.png"
            alt="Sankalpa Acharya"
          />
          <MessageContent>
            I’m using Recharts, but the data isn’t updating in real time.
          </MessageContent>
        </Message>

        <Message>
          <MessageAvatar src="" alt="AI" />
          <MessageContent className="bg-transparent">
            We can fix that by adding a `useEffect` to listen for new
            transactions and re-render your chart.
          </MessageContent>
        </Message>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
        <PromptInput className="max-w-3xl mx-auto">
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
    </div>
  );
}
