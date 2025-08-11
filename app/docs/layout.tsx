"use client";
import React from "react";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div
          className={`prose dark:prose-invert w-full max-w-7xl mx-auto px-6 py-6 pb-16`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
