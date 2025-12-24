"use client";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageActions,
  MessageAction,
} from "@/components/chatcn/ai/message";
import {
  PromptInput,
  PromptInputTextArea,
  PromptInputActions,
  PromptInputAction,
} from "@/components/chatcn/ai/prompt-input";
import {
  Source,
  SourceTrigger,
  SourceContent,
} from "@/components/chatcn/ai/source";
import { Tool } from "@/components/chatcn/ai/tool";
import {
  Thought,
  ThoughtTrigger,
  ThoughtContent,
} from "@/components/chatcn/ai/thought";
import {
  Thread,
  ThreadContent,
  ThreadActions,
  ThreadAction,
} from "@/components/chatcn/ai/thread";
import { File } from "@/components/chatcn/ai/file";
import { Markdown } from "@/components/chatcn/ai/markdown";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Archive,
  Pin,
  Bot,
  Sparkles,
  ArrowUp,
  Paperclip,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  MessageSquare,
} from "lucide-react";

export function ComponentShowcase() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Main showcase container */}
      <div className="rounded-2xl border overflow-hidden">
        {/* macOS-style header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-sm text-muted-foreground font-medium">
              Chatcn — AI Interface Components
            </span>
          </div>
          <Sparkles className="w-4 h-4 text-muted-foreground" />
        </div>

        <div className="flex min-h-[600px]">
          {/* Sidebar */}
          <div className="w-64 border-r flex-shrink-0 hidden lg:flex flex-col">
            <div className="p-3 border-b">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Conversations
              </h3>
            </div>
            <div className="flex-1 p-2 space-y-1 overflow-y-auto">
              <Thread>
                <ThreadContent>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>React Best Practices</span>
                  </div>
                </ThreadContent>
                <ThreadActions>
                  <ThreadAction>
                    <Pin className="w-4 h-4" /> Pin
                  </ThreadAction>
                  <ThreadAction>
                    <Archive className="w-4 h-4" /> Archive
                  </ThreadAction>
                  <ThreadAction>
                    <Trash2 className="w-4 h-4" /> Delete
                  </ThreadAction>
                </ThreadActions>
              </Thread>
              <Thread>
                <ThreadContent>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>TypeScript Guide</span>
                  </div>
                </ThreadContent>
                <ThreadActions>
                  <ThreadAction>
                    <Pin className="w-4 h-4" /> Pin
                  </ThreadAction>
                  <ThreadAction>
                    <Trash2 className="w-4 h-4" /> Delete
                  </ThreadAction>
                </ThreadActions>
              </Thread>
              <Thread>
                <ThreadContent>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Next.js Setup</span>
                  </div>
                </ThreadContent>
                <ThreadActions>
                  <ThreadAction>
                    <Archive className="w-4 h-4" /> Archive
                  </ThreadAction>
                </ThreadActions>
              </Thread>
              <Thread>
                <ThreadContent>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>API Integration</span>
                  </div>
                </ThreadContent>
                <ThreadActions>
                  <ThreadAction>
                    <Trash2 className="w-4 h-4" /> Delete
                  </ThreadAction>
                </ThreadActions>
              </Thread>
            </div>
          </div>

          {/* Main chat area */}
          <div className="flex-1 flex flex-col">
            {/* Messages area */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {/* User message */}
              <div className="flex justify-end">
                <Message className="flex-row-reverse max-w-[75%]">
                  <MessageAvatar
                    src="https://github.com/shadcn.png"
                    alt="You"
                  />
                  <MessageContent>
                    How do I create a beautiful AI chat interface with React?
                  </MessageContent>
                </Message>
              </div>

              {/* AI Thinking */}
              <Thought>
                <ThoughtTrigger>
                  <Bot className="w-4 h-4" />
                  <span>Thinking about your question...</span>
                </ThoughtTrigger>
                <ThoughtContent>
                  I&apos;m analyzing the best practices for creating AI chat
                  interfaces. This includes considering component structure,
                  state management, and UI/UX patterns commonly used in modern
                  chat applications.
                </ThoughtContent>
              </Thought>

              {/* Tool execution */}
              <Tool
                name="search_documentation"
                state="COMPLETED"
                input={{ query: "react chat ui best practices", limit: 5 }}
                output={{
                  results: 12,
                  topMatch: "shadcn/ui components",
                  confidence: 0.94,
                }}
              />

              {/* AI Response */}
              <Message className="max-w-[85%]">
                <MessageAvatar src="/logo.svg" alt="AI" />
                <div className="space-y-3">
                  <MessageContent>
                    <Markdown>
                      {`Great question! Here's how to build a beautiful AI chat interface:

1. **Use composable components** - Build small, reusable pieces
2. **Add smooth animations** - For messages, thinking states
3. **Include tool indicators** - Show when AI is searching/processing

Here's a quick example:

\`\`\`tsx
import { Message, PromptInput } from "@/chatcn"

function Chat() {
  return (
    <div>
      <Message>Hello!</Message>
      <PromptInput />
    </div>
  )
}
\`\`\`
`}
                    </Markdown>
                  </MessageContent>

                  {/* Sources */}
                  <div className="flex gap-2 flex-wrap">
                    <Source href="https://react.dev/learn" label="1">
                      <SourceTrigger />
                      <SourceContent
                        title="React Documentation"
                        description="Official React docs with best practices and tutorials"
                      />
                    </Source>
                    <Source href="https://ui.shadcn.com" label="2">
                      <SourceTrigger />
                      <SourceContent
                        title="shadcn/ui"
                        description="Beautifully designed components built with Radix UI"
                      />
                    </Source>
                    <Source href="https://tailwindcss.com" label="3">
                      <SourceTrigger />
                      <SourceContent
                        title="Tailwind CSS"
                        description="A utility-first CSS framework"
                      />
                    </Source>
                  </div>

                  {/* File attachment */}
                  <File
                    title="chat-example.tsx"
                    description="2.4 KB • TypeScript React"
                  />

                  {/* Message actions */}
                  <MessageActions>
                    <MessageAction tooltip="Copy response">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </MessageAction>
                    <MessageAction tooltip="Good response">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ThumbsUp className="h-3.5 w-3.5" />
                      </Button>
                    </MessageAction>
                    <MessageAction tooltip="Bad response">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ThumbsDown className="h-3.5 w-3.5" />
                      </Button>
                    </MessageAction>
                    <MessageAction tooltip="Regenerate">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <RotateCcw className="h-3.5 w-3.5" />
                      </Button>
                    </MessageAction>
                  </MessageActions>
                </div>
              </Message>
            </div>

            {/* Prompt input area */}
            <div className="p-4 border-t">
              <PromptInput className="w-full">
                <PromptInputTextArea placeholder="Ask anything about building AI interfaces..." />
                <PromptInputActions className="flex justify-between px-3 pb-3">
                  <div className="flex gap-1">
                    <PromptInputAction tooltip="Attach file">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </PromptInputAction>
                  </div>
                  <PromptInputAction tooltip="Send message">
                    <Button size="icon" className="h-8 w-8 rounded-full">
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </PromptInputAction>
                </PromptInputActions>
              </PromptInput>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
