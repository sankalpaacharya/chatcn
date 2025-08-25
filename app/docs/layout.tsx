import React, { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="prose dark:prose-invert max-w-4xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
