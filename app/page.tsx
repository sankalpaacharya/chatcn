"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Home() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center flex-col h-full space-y-10">
      {theme === "dark" && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
          }}
        />
      )}
      <div>
        <h1 className="text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Design ChatApp UI with Chatcn
        </h1>
      </div>

      <Link href={"/docs"}>
        <Button className="cursor-pointer font-medium">
          Explore Components
        </Button>
      </Link>
    </div>
  );
}
