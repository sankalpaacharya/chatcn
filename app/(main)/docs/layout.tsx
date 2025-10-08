import React, { ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import MainSidebar from "@/components/main-sidebar";

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full overflow-auto">
      <Sidebar/>
      <main className="flex-1 min-w-0 px-5 md:px-0">
        <div className="prose dark:prose-invert w-full max-w-4xl mx-auto py-10 prose-h1:m-0 prose-p:m-1 prose-p:text-primary ">
          {children}
        </div>
      </main>
      <aside className="w-96 py-10 sticky top-0 hidden 2xl:block"></aside>
    </div>
  );
}
