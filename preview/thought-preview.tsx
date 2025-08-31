import {
  Thought,
  ThoughtContent,
  ThoughtTrigger,
} from "@/registry/new-york/thought";

export default function ThoughtPreview() {
  return (
    <div className="flex justify-center">
      <Thought className="w-md">
        <ThoughtTrigger>Thinking for 10s</ThoughtTrigger>
        <ThoughtContent>
          You want me to review the existing shadcn-collections website and
          produce an improved UI for a similar experience. I’ll first capture a
          visual reference of the current site, then generate a focused design
          direction (colors, typography, layout improvements), and finally
          implement an improved UI using Next.js + shadcn/ui with a clean,
          mobile-first structure. I’ll keep the color system to 3-5 colors,
          limit typography to two font families, and follow Tailwind v4
          patterns. I’ll search the repo first, then create modular components
          (header, filters, grid, command palette, footer).
        </ThoughtContent>
      </Thought>
    </div>
  );
}
