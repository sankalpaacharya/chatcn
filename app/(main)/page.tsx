import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Blocks,
  Bot,
  CheckCircle2,
  Code2,
  FileText,
  GitBranch,
  Layers3,
  Paperclip,
  Search,
  Terminal,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Source,
  SourceTrigger,
  SourceContent,
} from "@/components/chatcn/ai/source";
import { File } from "@/components/chatcn/ai/file";
import {
  CommandBlock,
  CommandBlockHeader,
  CommandBlockTitle,
  CommandBlockContent,
} from "@/components/chatcn/ai/command-block";

type CatalogItem = {
  name: string;
  label: string;
  description: string;
  href: string;
  preview: ReactNode;
};

const catalogItems: CatalogItem[] = [
  {
    name: "Chat Container",
    label: "Layout",
    description: "Full conversation surfaces with sidebars, composer, and state.",
    href: "/marketplace/chat-container",
    preview: (
      <Image
        src="/marketplace/chat-container.webp"
        width={2336}
        height={1136}
        alt="Chat container component preview"
        className="h-full w-full object-contain p-4"
      />
    ),
  },
  {
    name: "Prompt Input",
    label: "Composer",
    description: "Responsive input, actions, attachments, and send affordances.",
    href: "/docs/component/prompt-input",
    preview: (
      <Image
        src="/marketplace/prompt.webp"
        width={1108}
        height={300}
        alt="Prompt input component preview"
        className="h-full w-full object-contain p-5"
      />
    ),
  },
  {
    name: "Markdown",
    label: "Response",
    description: "Readable AI output with code, prose, tables, and rich text.",
    href: "/marketplace/markdown-format",
    preview: (
      <Image
        src="/marketplace/markdown.webp"
        width={1900}
        height={1132}
        alt="Markdown component preview"
        className="h-full w-full object-contain p-4"
      />
    ),
  },
  {
    name: "Tool Calls",
    label: "Agent state",
    description: "Loading, completed, and error states for real tool execution.",
    href: "/docs/component/tool",
    preview: (
      <div className="flex h-full w-full items-center justify-center p-5">
        <div className="w-full max-w-sm [&>div]:!w-full">
          <Tool
            name="lookup_customer"
            state="COMPLETED"
            input={{ id: "cus_9241", include: "activity" }}
            output={{ status: "active", plan: "pro", seats: 12 }}
          />
        </div>
      </div>
    ),
  },
  {
    name: "Sources",
    label: "Citations",
    description: "Compact references with hover previews and source metadata.",
    href: "/docs/component/source",
    preview: (
      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="max-w-sm text-sm leading-7 text-muted-foreground">
          Attach grounded references directly to generated answers{" "}
          <Source href="https://react.dev" label="React">
            <SourceTrigger />
            <SourceContent
              title="React"
              description="The library for building user interfaces."
            />
          </Source>{" "}
          <Source href="https://ui.shadcn.com" label="shadcn/ui">
            <SourceTrigger />
            <SourceContent
              title="shadcn/ui"
              description="Open components built with Radix and Tailwind CSS."
            />
          </Source>
        </div>
      </div>
    ),
  },
  {
    name: "Files",
    label: "Attachments",
    description: "Clear file chips for uploads, generated artifacts, and context.",
    href: "/docs/component/file",
    preview: (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6">
        <File
          title="support-export.csv"
          description="24 KB · spreadsheet"
          className="w-full max-w-xs rounded-md"
        />
        <File
          title="handoff-notes.md"
          description="8 KB · markdown"
          className="w-full max-w-xs rounded-md"
        />
      </div>
    ),
  },
];

const featureItems = [
  {
    icon: Wrench,
    title: "Tool execution has a place",
    description:
      "Show pending, successful, and failed calls without inventing ad-hoc panels every sprint.",
  },
  {
    icon: FileText,
    title: "Responses stay readable",
    description:
      "Messages, markdown, sources, files, and code blocks compose into answer views that scan cleanly.",
  },
  {
    icon: GitBranch,
    title: "You own the code",
    description:
      "Components land in your repo through shadcn, so styling and behavior stay under your control.",
  },
];

const componentLinks = [
  "Message",
  "Prompt Input",
  "Tool",
  "Thought",
  "Source",
  "Thread",
  "Codeblock",
  "Weather",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b">
        <div className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <Blocks className="size-4" />
              Chatcn
            </div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:mt-4 sm:text-6xl lg:text-7xl">
              Chatcn
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-7">
              React components for AI products that need real conversation
              surfaces: messages, tools, files, sources, threads, markdown, and
              prompt inputs that live in your codebase.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:mt-6">
              <Button asChild size="lg">
                <Link href="/docs">
                  Browse docs
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/marketplace">
                  Marketplace
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-6 hidden w-full max-w-xl grid-cols-3 divide-x divide-border border-y text-left sm:grid">
              <Metric value="24+" label="Components" />
              <Metric value="shadcn" label="Install path" />
              <Metric value="Copy" label="Own the code" />
            </div>
          </div>

          <LandingWorkbench />
        </div>
      </section>

      <section className="border-b bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Layers3 className="size-4" />
              Interface states
            </div>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for the parts of AI apps that usually get patched together.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {featureItems.map((item) => (
              <div
                key={item.title}
                className="rounded-md border bg-background p-4 shadow-xs"
              >
                <item.icon className="size-5 text-foreground" />
                <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Code2 className="size-4" />
              Component catalog
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start with the surface you need.
            </h2>
          </div>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            See every component
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalogItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group overflow-hidden rounded-md border bg-card shadow-xs transition hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
            >
              <div className="aspect-[1.55] border-b bg-background">
                {item.preview}
              </div>
              <div className="flex items-start justify-between gap-4 p-4">
                <div className="min-w-0">
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {item.label}
                  </div>
                  <h3 className="mt-2 text-base font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Terminal className="size-4" />
              Install
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Add one component, then make it yours.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              Install from the registry, keep the source in your app, and adapt
              the pieces to your product instead of shipping another generic
              assistant screen.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {componentLinks.map((item) => (
                <Badge key={item} variant="outline" className="rounded-md">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <CommandBlock>
              <CommandBlockHeader>
                <CommandBlockTitle>Install a component</CommandBlockTitle>
              </CommandBlockHeader>
              <CommandBlockContent command="pnpm dlx shadcn@latest add https://chatcn.me/c/prompt-input" />
            </CommandBlock>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Link
                href="/docs/installation"
                className="inline-flex items-center gap-2 underline-offset-4 hover:text-foreground hover:underline"
              >
                Installation guide
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="https://github.com/sankalpaacharya/chatcn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 underline-offset-4 hover:text-foreground hover:underline"
              >
                GitHub
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-3 sm:px-5">
      <div className="text-sm font-semibold text-foreground sm:text-base">
        {value}
      </div>
      <div className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
        {label}
      </div>
    </div>
  );
}

function LandingWorkbench() {
  return (
    <div className="mx-auto mt-5 w-full max-w-6xl overflow-hidden rounded-md border bg-background shadow-[0_28px_90px_-58px_rgba(0,0,0,0.75)] sm:mt-7">
      <div className="flex h-10 items-center justify-between border-b bg-muted/30 px-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-red-500" />
          <span className="size-2.5 rounded-full bg-yellow-500" />
          <span className="size-2.5 rounded-full bg-green-500" />
        </div>
        <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
          <Code2 className="size-3.5" />
          production-chat.tsx
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="size-3.5 text-green-500" />
          Ready
        </div>
      </div>

      <div className="grid h-[220px] grid-cols-1 sm:h-[390px] lg:h-[420px] lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_300px]">
        <aside className="hidden border-r bg-muted/20 p-3 lg:flex lg:flex-col">
          <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
            <Search className="size-4" />
            Search threads
          </div>
          <div className="mt-4 space-y-2">
            {["Support triage", "Onboarding agent", "Billing assistant"].map(
              (item, index) => (
                <div
                  key={item}
                  className="rounded-md border bg-background px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{item}</span>
                    {index === 0 && (
                      <span className="size-2 rounded-full bg-green-500" />
                    )}
                  </div>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    Tools, sources, files
                  </p>
                </div>
              )
            )}
          </div>
          <div className="mt-auto rounded-md border bg-background p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Bot className="size-4" />
              Agent run
            </div>
            <div className="mt-3 space-y-2">
              <ProgressRow label="Parse" value="Complete" />
              <ProgressRow label="Search" value="Complete" />
              <ProgressRow label="Answer" value="Drafting" />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between gap-4 border-b px-4 py-3">
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold">
                Customer support copilot
              </h2>
              <p className="truncate text-xs text-muted-foreground">
                Messages, reasoning, tools, citations, and composer in one view
              </p>
            </div>
            <Badge variant="outline" className="hidden rounded-md sm:inline-flex">
              Live preview
            </Badge>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden px-4 py-4">
            <div className="mx-auto flex h-full max-w-3xl flex-col gap-4">
              <Message variant="user" className="justify-end">
                <MessageContent>
                  Pull the latest invoice context and draft a concise answer.
                </MessageContent>
              </Message>

              <Thought>
                <ThoughtTrigger>
                  <Bot className="size-4" />
                  <span>Checking billing state</span>
                </ThoughtTrigger>
                <ThoughtContent>
                  Collecting invoice, plan, and customer history before writing
                  the reply.
                </ThoughtContent>
              </Thought>

              <div className="w-full max-w-md [&>div]:!w-full">
                <Tool
                  name="get_invoice_context"
                  state="COMPLETED"
                  input={{ customerId: "cus_9241" }}
                  output={{ invoice: "paid", plan: "Pro", seats: 12 }}
                />
              </div>

              <Message variant="ai">
                <MessageAvatar src="/images/gaia_logo.svg" alt="Chatcn" />
                <MessageContent>
                  The Pro invoice is marked paid. I would answer with the
                  receipt date, seat count, and the upgrade window.
                </MessageContent>
              </Message>

              <div className="flex flex-wrap gap-2 text-xs">
                <Source href="https://react.dev" label="React">
                  <SourceTrigger />
                  <SourceContent
                    title="React"
                    description="UI primitives compose into product surfaces."
                  />
                </Source>
                <Source href="https://ui.shadcn.com" label="shadcn/ui">
                  <SourceTrigger />
                  <SourceContent
                    title="shadcn/ui"
                    description="Own the component source in your app."
                  />
                </Source>
              </div>
            </div>
          </div>

          <div className="border-t p-3">
            <PromptInput
              value="Add source chips, failed tool states, and a file attachment"
              disabled
              className="mx-auto max-w-3xl"
            >
              <PromptInputTextArea disableAutoSize />
              <PromptInputActions className="justify-between px-1 pt-1">
                <PromptInputAction tooltip="Attach context">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip className="size-4" />
                  </Button>
                </PromptInputAction>
                <PromptInputAction tooltip="Send">
                  <Button size="icon" className="h-8 w-8 rounded-full">
                    <ArrowUp className="size-4" />
                  </Button>
                </PromptInputAction>
              </PromptInputActions>
            </PromptInput>
          </div>
        </div>

        <aside className="hidden border-l bg-muted/20 p-3 xl:flex xl:flex-col">
          <div className="rounded-md border bg-background p-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Wrench className="size-4" />
              Tool payload
            </div>
            <div className="mt-3 grid gap-2 text-xs">
              <InspectorRow label="State" value="Completed" />
              <InspectorRow label="Latency" value="412 ms" />
              <InspectorRow label="Tokens" value="1.8k" />
            </div>
          </div>

          <div className="mt-3 rounded-md border bg-background p-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FileText className="size-4" />
              Context
            </div>
            <div className="mt-3 space-y-2">
              <File
                title="invoice.pdf"
                description="142 KB"
                className="w-full rounded-md px-2 py-2"
              />
              <File
                title="plan.json"
                description="4 KB"
                className="w-full rounded-md px-2 py-2"
              />
            </div>
          </div>

          <div className="mt-auto rounded-md border bg-background p-3">
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Ship path
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <CheckLine text="Install registry item" />
              <CheckLine text="Style with your tokens" />
              <CheckLine text="Wire into model events" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProgressRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function InspectorRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-muted/50 px-2 py-1.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function CheckLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <CheckCircle2 className="size-4 text-green-500" />
      <span>{text}</span>
    </div>
  );
}
