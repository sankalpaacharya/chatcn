"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp, Check } from "lucide-react";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/new-york/message";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextArea,
} from "@/registry/new-york/prompt-input";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 lg:p-8">
      {theme === "dark" && isMounted && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
          }}
        />
      )}

      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 text-center xl:text-left">
            <div>
              <div className="bg-secondary py-1.5 px-3 rounded-full text-xs w-fit mx-auto xl:mx-0 mb-3">
                ✦ Component UI
              </div>
              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans font-bold leading-tight ${
                  theme === "dark" && isMounted
                    ? "bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600"
                    : "text-foreground"
                }`}
              >
                Design ChatApp UI with Chatcn
              </h1>
            </div>

            <p className="text-muted-foreground text-lg lg:text-xl max-w-lg mx-auto xl:mx-0">
              Customizable components for building AI chat apps, faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center xl:justify-start">
              <Link href="/docs">
                <Button className="w-full sm:w-auto flex items-center justify-center gap-2 font-medium rounded-full px-6 py-5 text-sm">
                  Explore Components
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 font-medium rounded-full px-6 py-5 text-sm"
                >
                  View Examples
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 justify-center xl:justify-start">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check size={16} /> Customizable
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check size={16} /> Examples
              </span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check size={16} /> Templates
              </span>
            </div>
          </div>

          <div className="flex justify-center xl:justify-end mt-8 xl:mt-0">
            <div className="w-full max-w-md xl:max-w-lg">
              <ChatCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatCard() {
  return (
    <div className="w-full space-y-4 p-4">
      <Message className="justify-end">
        <MessageContent className="text-sm max-w-sm">
          Hey, do you know about chatcn?
        </MessageContent>
      </Message>

      <Message>
        <MessageAvatar src="https://github.com/" alt="AI" className="w-8 h-8" />
        <MessageContent className="bg-transparent text-sm max-w-md">
          Yes! It looks like a really nice library for building AI chat
          interfaces. The components seem well designed and customizable.
        </MessageContent>
      </Message>

      {/* Input */}
      <div className="flex justify-center mt-6">
        <PromptInput className="w-full max-w-md">
          <PromptInputTextArea
            placeholder="What do you want to know?"
            className="text-sm min-h-[40px]"
          />
          <PromptInputActions className="justify-end pt-2">
            <PromptInputAction tooltip="submit">
              <Button
                variant="default"
                size="icon"
                className="h-7 w-7 rounded-full"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </Button>
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
      </div>
    </div>
  );
}
