"use client";
import React, { useState, useEffect } from "react";
import {
  Thought,
  ThoughtContent,
  ThoughtTrigger,
} from "@/components/chatcn/thought";
import ShinyText from "@/components/ShinyText";

interface StreamingTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  isStreamingComplete: boolean;
  setIsStreamingComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const StreamingText: React.FC<StreamingTextProps> = ({
  text,
  disabled = false,
  speed = 0.05,
  className = "",
  isStreamingComplete,
  setIsStreamingComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Streaming effect
  useEffect(() => {
    if (disabled || currentIndex >= text.length) {
      if (currentIndex >= text.length && !isStreamingComplete) {
        setIsStreamingComplete(true);
      }
      return;
    }

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [
    currentIndex,
    text,
    speed,
    disabled,
    isStreamingComplete,
    setIsStreamingComplete,
  ]);

  return isStreamingComplete ? (
    <span className={className}>{displayedText}</span>
  ) : (
    <ShinyText
      text={displayedText || "\u00A0"}
      disabled={disabled}
      speed={3}
      className={className}
    />
  );
};

export default function ThoughtStreaming() {
  const [isStreamingComplete, setIsStreamingComplete] = useState(false);

  return (
    <div className="flex justify-center bg-background p-4">
      <Thought className="w-full max-w-md">
        <ThoughtTrigger>
          {isStreamingComplete ? (
            <span>Thought for 10s</span>
          ) : (
            <ShinyText text="Thought for 10s" disabled={false} speed={3} />
          )}
        </ThoughtTrigger>
        <ThoughtContent>
          <StreamingText
            text="You want me to review the existing shadcn-collections website and produce an improved UI for a similar experience. I’ll first capture a visual reference of the current site, then generate a focused design direction (colors, typography, layout improvements), and finally implement an improved UI using Next.js + shadcn/ui with a clean, mobile-first structure. I’ll keep the color system to 3-5 colors, limit typography to two font families, and follow Tailwind v4 patterns. I’ll search the repo first, then create modular components (header, filters, grid, command palette, footer)."
            speed={0.01}
            isStreamingComplete={isStreamingComplete}
            setIsStreamingComplete={setIsStreamingComplete}
          />
        </ThoughtContent>
      </Thought>
    </div>
  );
}
