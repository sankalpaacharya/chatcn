"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/new-york/message/message";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextArea,
} from "@/registry/new-york/prompt-input/prompt-input";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center xl:text-left">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-bold leading-tight ${
                theme === "dark" && isMounted
                  ? "bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600"
                  : "bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-400"
              }`}
            >
              Design ChatApp UI with Chatcn
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-md mx-auto xl:mx-0">
              Customizable components for building AI chat apps, faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center xl:justify-start">
              <Link href="/docs">
                <Button className="w-full sm:w-auto flex items-center justify-center gap-2 font-medium rounded-full px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base">
                  Explore Components
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 font-medium rounded-full px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base"
                >
                  View Examples
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center mt-8 xl:mt-0 xl:justify-end">
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
    <div className="w-full space-y-4 sm:space-y-6 p-4 sm:p-6">
      <Message className="justify-end">
        <MessageContent className="text-sm sm:text-base max-w-xs sm:max-w-sm">
          Hey, do you know about chatcn?
        </MessageContent>
      </Message>

      <Message>
        <MessageAvatar
          src="https://github.com/"
          alt="AI"
          className="w-8 h-8 sm:w-10 sm:h-10"
        />
        <MessageContent className="bg-transparent text-sm sm:text-base max-w-xs sm:max-w-sm lg:max-w-md">
          Yes! It looks like a really nice library for building AI chat
          interfaces. The components seem well designed and customizable.
        </MessageContent>
      </Message>

      <div className="flex justify-center mt-6 sm:mt-8">
        <PromptInput className="w-full max-w-md">
          <PromptInputTextArea
            placeholder="What do you want to know?"
            className="text-sm sm:text-base min-h-[40px] sm:min-h-[48px]"
          />
          <PromptInputActions className="justify-end pt-2">
            <PromptInputAction tooltip="submit">
              <Button
                variant="default"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
              >
                <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
      </div>
    </div>
  );
}
