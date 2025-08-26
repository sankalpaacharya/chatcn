import React, { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="w-full flex flex-1 overflow-auto h-full">
        <main className="flex-1">
          <div className="prose dark:prose-invert max-w-4xl mx-auto px-6 py-10 prose-h1:m-0  prose-p:m-1 prose-p:text-muted-foreground">
            {children}
          </div>
        </main>
        <aside className="w-92 hidden md:block sticky top-0 py-10 text-md">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">
            On this page
          </h2>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="hover:text-primary cursor-pointer">Overview</li>
            <li className="hover:text-primary cursor-pointer">Installation</li>
            <li className="hover:text-primary cursor-pointer">
              Usage
              <ul className="ml-4 mt-1 space-y-1 list-disc list-inside">
                <li className="hover:text-primary cursor-pointer">Examples</li>
              </ul>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
