"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, Check } from "lucide-react";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/chatcn/message";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextArea,
} from "@/components/chatcn/prompt-input";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [stars, setStars] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/sankalpaacharya/chatcn"
        );
        const data = await res.json();
        setStars(data.stargazers_count);
      } catch (err) {
        console.error("Failed to fetch stars", err);
      }
    }

    fetchStars();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {theme === "dark" && isMounted && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
          }}
        />
      )}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 md:py-28">
        <div className="inline-flex items-center gap-2 bg-muted/30 border border-border/40 rounded-full px-4 py-1.5 text-sm text-muted-foreground mb-6 backdrop-blur-sm">
          <span>
            Backed by{" "}
            <span className="bg-gradient-to-r bg-orange-500 text-white font-semibold px-1 rounded shadow-sm">
              C
            </span>
            <span className="ml-0.5">ommunity</span>
          </span>
        </div>

        <div className="w-full max-w-4xl mx-auto text-center space-y-6">
          <div>
            <Link
              href={"https://github.com/sankalpaacharya/chatcn"}
              className="bg-secondary/80 py-1.5 px-4 rounded-full inline-flex items-center mx-auto mb-6"
            >
              <span className="mr-1.5">🌟</span> {stars} stars on Github
            </Link>
            <h1
              className={`text-5xl sm:text-6xl md:text-7xl font-sans font-bold leading-tight tracking-tight ${
                theme === "dark" && isMounted
                  ? "bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                  : "text-foreground"
              }`}
            >
              Design ChatApp UI with Chatcn
            </h1>
          </div>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Customizable components for building AI chat applications faster.
            Ready-to-use, beautiful, and accessible UI components.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/docs">
              <Button className="font-medium rounded-md px-6 py-5 text-sm">
                Get Started
              </Button>
            </Link>
            <Link href="/docs/">
              <Button
                variant="outline"
                className="font-medium rounded-md px-6 py-5 text-sm"
              >
                View Components
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-2">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check size={16} className="text-primary" /> Customizable
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check size={16} className="text-primary" /> Accessibility-focused
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check size={16} className="text-primary" /> Open Source
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2 lg:col-span-3">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">
                Try Our AI Chat Interface Components
              </h2>
              <p className="text-muted-foreground">
                Pre-built and ready to integrate into your applications
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-start-2 lg:col-span-1">
          <div className="flex justify-center">
            <div className="w-full">
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
    <div className="w-full space-y-4 p-6 border border-border/40 rounded-xl bg-card/50 backdrop-blur-sm shadow-md relative overflow-hidden max-w-lg mx-auto">
      <div className="absolute top-0 left-0 right-0 h-10 bg-background/90 backdrop-blur-sm border-b border-border/40 flex items-center px-4">
        <div className="flex space-x-1.5 absolute left-3">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <div className="mx-auto text-xs text-muted-foreground">ChatCN Demo</div>
      </div>

      <div className="mt-6 pt-4 space-y-5">
        <Message>
          <MessageAvatar
            src="https://github.com/"
            alt="AI"
            className="w-8 h-8"
          />
          <MessageContent className="bg-transparent text-sm">
            Hello! I&apos;m a demo of the ChatCN components. Ask me anything
            about these UI components.
          </MessageContent>
        </Message>

        <Message className="justify-end">
          <MessageContent className="text-sm max-w-sm">
            What makes ChatCN components special?
          </MessageContent>
        </Message>

        <Message>
          <MessageAvatar
            src="https://github.com/"
            alt="AI"
            className="w-8 h-8"
          />
          <MessageContent className="bg-transparent text-sm">
            ChatCN provides beautifully designed, accessible, and customizable
            UI components specifically for AI chat interfaces. They&apos;re easy
            to integrate, fully responsive, and work seamlessly with
            shadcn&apos;s design system.
          </MessageContent>
        </Message>
      </div>

      {/* Input */}
      <div className="flex justify-center mt-6">
        <PromptInput className="w-full">
          <PromptInputTextArea
            placeholder="Tell me anything"
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
