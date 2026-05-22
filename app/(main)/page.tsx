import Link from "next/link";

const categories: { label: string; links: { label: string; href: string }[] }[] =
  [
    {
      label: "AI Components",
      links: [
        { label: "Message", href: "/docs/component/message" },
        { label: "Prompt Input", href: "/docs/component/prompt-input" },
        { label: "Markdown", href: "/docs/component/markdown" },
        { label: "Code Block", href: "/docs/component/codeblock" },
        { label: "Command Block", href: "/docs/component/command-block" },
        { label: "Code Editor", href: "/docs/component/code-editor" },
        { label: "Thought", href: "/docs/component/thought" },
        { label: "Thread", href: "/docs/component/thread" },
        { label: "Tool", href: "/docs/component/tool" },
        { label: "Source", href: "/docs/component/source" },
        { label: "File", href: "/docs/component/file" },
        { label: "Chat Container", href: "/docs/component/chat-container" },
      ],
    },
    {
      label: "System",
      links: [
        { label: "Terminal", href: "/docs/system/terminal" },
        { label: "Status Bar", href: "/docs/system/status-bar" },
        { label: "File Manager", href: "/docs/system/file-manager" },
        { label: "Login Manager", href: "/docs/system/login-manager" },
        { label: "App Manager", href: "/docs/system/applications-manager" },
      ],
    },
    {
      label: "3D",
      links: [
        { label: "Model", href: "/docs/3d-components/model" },
        { label: "Audio Visualizer", href: "/docs/3d-components/audio-visualizer" },
        { label: "Login", href: "/docs/3d-components/login" },
        { label: "Signup", href: "/docs/3d-components/signup" },
      ],
    },
    {
      label: "Tool Call UI",
      links: [
        { label: "Weather", href: "/docs/component/weather" },
        { label: "Email", href: "/docs/component/email" },
        { label: "Charts", href: "/docs/component/charts" },
      ],
    },
    {
      label: "Misc",
      links: [{ label: "Video Carousel", href: "/docs/misc/video-carousel" }],
    },
  ];

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          A component library for AI interfaces.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          chatcn is a set of React components for messages, prompt inputs,
          reasoning, tool calls and more. They&apos;re built on shadcn/ui — copy
          them into your project and own the code.
        </p>

        <div className="mt-7 flex items-center gap-3 rounded-md border bg-muted/30 px-4 py-3 font-mono text-sm">
          <span className="select-none text-muted-foreground">$</span>
          <code className="overflow-x-auto whitespace-nowrap">
            npx shadcn@latest add @chatcn/prompt-input
          </code>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link
            href="/docs"
            className="font-medium underline-offset-4 hover:underline"
          >
            Read the docs →
          </Link>
          <Link
            href="https://github.com/sankalpaacharya/chatcn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            GitHub
          </Link>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-sm font-medium text-muted-foreground">Components</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {categories.map((category) => (
            <div key={category.label}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                {category.label}
              </h3>
              <ul className="mt-3 space-y-2">
                {category.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
