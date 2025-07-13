import React from "react";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="dark:prose-invert prose w-full max-w-7xl mx-auto pt-10">
          {children}
        </div>
      </main>
    </div>
  );
}
