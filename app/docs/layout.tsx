import React, { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="prose dark:prose-invert max-w-4xl  mx-auto pb-10 mt-10">
          {children}
        </div>
      </main>
    </div>
  );
}
