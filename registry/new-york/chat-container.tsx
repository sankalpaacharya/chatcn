"use client";
import { useRef, useEffect, useState } from "react";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/registry/new-york/message";
import { cn } from "@/lib/utils";
export default function ChatContainer() {
  const chatRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    { from: "user", text: "Hey AI, can you help me with my project?" },
    { from: "ai", text: "Of course! What are you working on right now?" },
  ]);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  const addMessage = () => {
    setMessages((prev) => [
      ...prev,
      {
        from: prev.length % 2 === 0 ? "user" : "ai",
        text:
          prev.length % 2 === 0
            ? "This is a new user message!"
            : "This is a new AI reply!",
      },
    ]);
  };
  return (
    <div className="flex flex-col max-h-[30rem]">
      <div
        ref={chatRef}
        className="space-y-5 flex-1 flex-col-reverse overflow-auto px-10 py-4 border rounded pb-[23.5rem]"
      >
        {messages.map((msg, idx) => (
          <Message
            key={idx}
            className={cn(msg.from === "user" ? "justify-end" : "", "")}
          >
            <MessageAvatar
              src={
                msg.from === "user"
                  ? "https://github.com/sankalpaacharya.png"
                  : "https://api.dicebear.com/8.x/bottts/svg?seed=AI"
              }
              alt={msg.from === "user" ? "Sankalpa Acharya" : "AI Assistant"}
            />
            <MessageContent
              className={msg.from === "ai" ? "bg-transparent" : ""}
            >
              {msg.text}
            </MessageContent>
          </Message>
        ))}
      </div>
      {/* simple button to add messages */}
      <button
        onClick={addMessage}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Message
      </button>
    </div>
  );
}
