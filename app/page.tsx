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
    <div className="flex justify-center flex-col h-full space-y-10">
      {theme === "dark" && isMounted && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
          }}
        />
      )}
      <div className="flex w-7xl mx-auto">
        <div className="w-[40rem] space-y-7">
          <h1
            className={`text-4xl md:text-7xl font-sans font-bold ${
              theme === "dark" && isMounted
                ? "bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600"
                : "bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-400"
            }`}
          >
            Design ChatApp UI with Chatcn
          </h1>
          <p className="text-muted-foreground text-lg">
            Customize colors, typography, and layouts with a real-time preview.
            No signup required.
          </p>

          <div className="flex space-x-3">
            <Link href="/docs">
              <Button className="flex cursor-pointer font-medium rounded-full p-6 px-8">
                Explore Components
                <ArrowRight />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant={"outline"}
                className="flex cursor-pointer font-medium rounded-full p-6 px-8"
              >
                View Examples
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <ChatCard />
        </div>
      </div>
    </div>
  );
}

function ChatCard() {
  return (
    <div className="space-y-5">
      <Message className="justify-end">
        <MessageContent>
          Hey, do you know about this cool UI component library?
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar
          src="https://github.com/sankalpaacharya.png"
          alt="Sankalpa Acharya"
        />
        <MessageContent className="bg-transparent">
          Hey, do you know about this cool UI component library?
        </MessageContent>
      </Message>
      <div className="flex justify-center">
        <PromptInput className="w-md">
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
