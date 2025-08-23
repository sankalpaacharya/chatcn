"use client";
import React, { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <aside className="w-64 shrink-0 border-r">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="prose dark:prose-invert max-w-4xl px-6 py-10 mx-auto pb-20">
          {children}
        </div>
      </main>
    </div>
  );
}
