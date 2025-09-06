"use client";

import React, { useState, useRef } from "react";
import {
  PromptInput,
  PromptInputTextArea,
  PromptInputActions,
  PromptInputAction,
} from "@/registry/new-york/prompt-input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Settings, Paperclip, Image, SendHorizonal } from "lucide-react";
import ChatContainer from "@/registry/new-york/chat-container";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/new-york/message";
import { Markdown } from "@/registry/new-york/markdown";
import {
  Source,
  SourceTrigger,
  SourceContent,
} from "@/registry/new-york/source";
import {
  Thought,
  ThoughtTrigger,
  ThoughtContent,
} from "@/registry/new-york/thought";
import { File } from "@/registry/new-york/file";

// Mock message data
type ChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  sources?: Array<{
    title: string;
    description: string;
    url: string;
  }>;
  thoughts?: string;
};

export default function V0ChatTemplate() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hi there! How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response with different formats based on the input
    setTimeout(() => {
      let aiResponse: ChatMessage;

      if (inputValue.toLowerCase().includes("markdown")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content:
            'Here\'s some markdown content:\n\n## Example Heading\n\nThis is a paragraph with **bold** and *italic* text.\n\n- List item 1\n- List item 2\n\n```tsx\nconst greeting = () => {\n  console.log("Hello world!");\n};\n```',
          role: "assistant",
          timestamp: new Date(),
          sources: [
            {
              title: "Markdown Guide",
              description:
                "A reference guide for markdown syntax and formatting options.",
              url: "https://www.markdownguide.org",
            },
          ],
          thoughts:
            "The user wants to see markdown formatting. I'll provide a sample with various markdown elements.",
        };
      } else if (inputValue.toLowerCase().includes("source")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "Sources are important for verifying information. Here's a response with multiple sources attached.",
          role: "assistant",
          timestamp: new Date(),
          sources: [
            {
              title: "Research Paper on AI",
              description:
                "A comprehensive study on the impact of AI on modern software development.",
              url: "https://example.com/research",
            },
            {
              title: "Latest UI Design Trends",
              description:
                "An overview of modern UI design patterns and practices.",
              url: "https://example.com/design",
            },
          ],
        };
      } else if (inputValue.toLowerCase().includes("file")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: "I've prepared a file for you based on your request:",
          role: "assistant",
          timestamp: new Date(),
        };
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          content: `I understand you're asking about "${inputValue}". Here's my response based on your query...`,
          role: "assistant",
          timestamp: new Date(),
          thoughts: "I'll provide a general response since the query is broad.",
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background">
      {/* Header */}
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageAvatar src="/ai-avatar.png" alt="AI" />
          <h1 className="font-medium">AI Assistant</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </header>

      {/* Chat Messages */}
      <ChatContainer className="flex-1 overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-3 max-w-[85%] ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <MessageAvatar
                src={
                  message.role === "assistant"
                    ? "/ai-avatar.png"
                    : "/user-avatar.png"
                }
                alt={message.role === "assistant" ? "AI" : "You"}
                className="h-8 w-8 mt-0.5"
              />
              <div className="flex flex-col gap-2">
                <MessageContent
                  className={
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }
                >
                  <Markdown>{message.content}</Markdown>

                  {/* Display file example if the message mentions files */}
                  {message.content.toLowerCase().includes("file") &&
                    message.role === "assistant" && (
                      <div className="mt-3">
                        <File title="example.tsx" description="2.4 KB" />
                      </div>
                    )}
                </MessageContent>

                {/* Sources section */}
                {message.sources && message.sources.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {message.sources.map((source, idx) => (
                      <Source key={idx} href={source.url}>
                        <SourceTrigger />
                        <SourceContent
                          title={source.title}
                          description={source.description}
                        />
                      </Source>
                    ))}
                  </div>
                )}

                {/* Thoughts section */}
                {message.thoughts && (
                  <Thought className="mt-1">
                    <ThoughtTrigger>
                      <span className="text-xs">View thoughts</span>
                    </ThoughtTrigger>
                    <ThoughtContent>
                      <p className="text-xs py-2">{message.thoughts}</p>
                    </ThoughtContent>
                  </Thought>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <Message>
              <MessageAvatar
                src="/ai-avatar.png"
                alt="AI"
                className="h-8 w-8 mt-0.5"
              />
              <MessageContent className="bg-muted">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                </div>
              </MessageContent>
            </Message>
          </div>
        )}
        <div ref={messagesEndRef} />
      </ChatContainer>

      {/* Input Area */}
      <footer className="p-4 border-t">
        <div className="max-w-3xl mx-auto">
          <PromptInput
            value={inputValue}
            onValueChange={setInputValue}
            onSubmit={handleSubmit}
            className="relative"
          >
            <PromptInputTextArea
              placeholder="Send a message..."
              onKeyDown={handleKeyDown}
              className="min-h-[52px] py-3 px-4 pr-16"
            />
            <PromptInputActions className="absolute right-2 bottom-2">
              <PromptInputAction tooltip="Add attachment" side="top">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Paperclip className="h-5 w-5" />
                </Button>
              </PromptInputAction>
              <PromptInputAction tooltip="Add image" side="top">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Image className="h-5 w-5" />
                </Button>
              </PromptInputAction>
              <PromptInputAction tooltip="Send" side="top">
                <Button
                  onClick={handleSubmit}
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  disabled={!inputValue.trim()}
                >
                  <SendHorizonal className="h-4 w-4" />
                </Button>
              </PromptInputAction>
            </PromptInputActions>
          </PromptInput>
          <div className="mt-2 text-center">
            <p className="text-xs text-muted-foreground">
              AI may produce inaccurate information about people, places, or
              facts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
