import Link from "next/link";
import { ArrowUpRight, ArrowUp, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/chatcn/ai/message";
import {
  PromptInput,
  PromptInputTextArea,
  PromptInputActions,
  PromptInputAction,
} from "@/components/chatcn/ai/prompt-input";
import {
  Thought,
  ThoughtTrigger,
  ThoughtContent,
} from "@/components/chatcn/ai/thought";
import { Tool } from "@/components/chatcn/ai/tool";
import { Source, SourceTrigger, SourceContent } from "@/components/chatcn/ai/source";
import { File } from "@/components/chatcn/ai/file";
import {
  CommandBlock,
  CommandBlockHeader,
  CommandBlockTitle,
  CommandBlockContent,
} from "@/components/chatcn/ai/command-block";
import WeatherCard from "@/components/chatcn/tool-call/weather";

type ShowcaseItem = {
  name: string;
  description: string;
  href: string;
  preview: React.ReactNode;
};

const items: ShowcaseItem[] = [
  {
    name: "Message",
    description: "Chat bubbles for users and AI",
    href: "/docs/component/message",
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Message variant="user" className="justify-end">
          <MessageContent>Can you help me build a chat UI?</MessageContent>
        </Message>
        <Message variant="ai">
          <MessageAvatar src="/logo.svg" alt="AI" fallback="AI" />
          <MessageContent>Absolutely — let&apos;s start with the layout.</MessageContent>
        </Message>
      </div>
    ),
  },
  {
    name: "Prompt Input",
    description: "Auto-resizing composer with actions",
    href: "/docs/component/prompt-input",
    preview: (
      <PromptInput className="w-full max-w-sm">
        <PromptInputTextArea placeholder="Ask anything..." />
        <PromptInputActions className="flex items-center justify-between px-1 pt-1">
          <PromptInputAction tooltip="Attach">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Paperclip className="h-4 w-4" />
            </Button>
          </PromptInputAction>
          <PromptInputAction tooltip="Send">
            <Button size="icon" className="h-8 w-8 rounded-full">
              <ArrowUp className="h-4 w-4" />
            </Button>
          </PromptInputAction>
        </PromptInputActions>
      </PromptInput>
    ),
  },
  {
    name: "Tool",
    description: "Render tool calls and their results",
    href: "/docs/component/tool",
    preview: (
      <div className="w-full max-w-sm [&>div]:!w-full">
        <Tool
          name="get_weather"
          state="COMPLETED"
          input={{ city: "Tokyo" }}
          output={{ temp: "18°C", condition: "Cloudy" }}
        />
      </div>
    ),
  },
  {
    name: "Thought",
    description: "Collapsible reasoning blocks",
    href: "/docs/component/thought",
    preview: (
      <div className="w-full max-w-sm">
        <Thought>
          <ThoughtTrigger>
            <span>Reasoning through the problem…</span>
          </ThoughtTrigger>
          <ThoughtContent>
            First, parse the request, then pick the right component.
          </ThoughtContent>
        </Thought>
      </div>
    ),
  },
  {
    name: "Source",
    description: "Inline citations with rich previews",
    href: "/docs/component/source",
    preview: (
      <div className="max-w-xs text-sm leading-relaxed text-foreground/80">
        React keeps your UI in sync with state, and shadcn/ui gives you the
        components to build with.{" "}
        <span className="inline-flex translate-y-1 gap-1">
          <Source href="https://react.dev" label="react.dev">
            <SourceTrigger />
            <SourceContent title="React" description="The library for web UIs" />
          </Source>
          <Source href="https://ui.shadcn.com" label="shadcn/ui">
            <SourceTrigger />
            <SourceContent
              title="shadcn/ui"
              description="Components built with Radix"
            />
          </Source>
        </span>
      </div>
    ),
  },
  {
    name: "File",
    description: "Compact file attachment chips",
    href: "/docs/component/file",
    preview: (
      <div className="flex flex-col items-center gap-3">
        <File title="chat-ui.tsx" description="2.4 KB · TypeScript" />
        <File title="theme.css" description="0.9 KB · Stylesheet" />
      </div>
    ),
  },
  {
    name: "Command Block",
    description: "Copyable install / shell snippets",
    href: "/docs/component/command-block",
    preview: (
      <div className="w-full max-w-sm">
        <CommandBlock>
          <CommandBlockHeader>
            <CommandBlockTitle>Terminal</CommandBlockTitle>
          </CommandBlockHeader>
          <CommandBlockContent command="npx shadcn@latest add @chatcn/message" />
        </CommandBlock>
      </div>
    ),
  },
  {
    name: "Weather",
    description: "Rich tool-call result card",
    href: "/docs/component/weather",
    preview: (
      <div className="w-full max-w-sm origin-center scale-[0.72]">
        <WeatherCard
          currentTemp={18}
          condition="Cloudy"
          location="Tokyo"
          humidity={64}
          windSpeed={12}
          feelsLike={17}
          weeklyForecast={[
            { day: "Mon", tempHigh: 19, tempLow: 11, icon: "☁️" },
            { day: "Tue", tempHigh: 21, tempLow: 12, icon: "⛅" },
            { day: "Wed", tempHigh: 22, tempLow: 13, icon: "☀️" },
            { day: "Thu", tempHigh: 20, tempLow: 12, icon: "🌧️" },
            { day: "Fri", tempHigh: 18, tempLow: 10, icon: "☁️" },
            { day: "Sat", tempHigh: 23, tempLow: 14, icon: "☀️" },
            { day: "Sun", tempHigh: 21, tempLow: 13, icon: "⛅" },
          ]}
        />
      </div>
    ),
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Components for AI interfaces
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          A growing collection of copy-and-paste React components — chat,
          reasoning, tool calls and more — built on shadcn/ui. Browse them below.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href="/docs">Get started</Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="https://github.com/sankalpaacharya/chatcn"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </Button>
        </div>
      </section>

      <section className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.href}
            className="group relative flex h-[300px] flex-col overflow-hidden rounded-xl border bg-card transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg"
          >
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden border-b bg-gradient-to-b from-muted/40 to-muted/5 p-6">
              <div className="pointer-events-none flex w-full justify-center">
                {item.preview}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 px-4 py-3">
              <div className="min-w-0">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {item.description}
                </div>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
            <Link
              href={item.href}
              aria-label={item.name}
              className="absolute inset-0 z-10"
            />
          </div>
        ))}
      </section>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <Link href="/docs" className="underline-offset-4 hover:text-foreground hover:underline">
          See all components in the docs →
        </Link>
      </div>
    </main>
  );
}
