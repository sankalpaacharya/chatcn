"use client";
import React from "react";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import { cn } from "@/lib/utils";

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div
          className={`prose dark:prose-invert w-full max-w-4xl mx-auto pt-10`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
