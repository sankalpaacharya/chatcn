"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function ChatContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatRef.current) return;

    const observer = new MutationObserver(() => {
      if (chatRef.current) {
        chatRef.current.scrollTo({
          top: chatRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    });

    observer.observe(chatRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        ref={chatRef}
        className="space-y-5 flex-1 overflow-auto px-10 py-4 rounded"
      >
        {children}
      </div>
    </div>
  );
}
