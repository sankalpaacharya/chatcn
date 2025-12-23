import React, { ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DocsBreadcrumb from "@/components/docs-breadcrumb";
import DocsPageNav from "@/components/docs-page-nav";
import TableOfContents from "@/components/table-of-contents";
import GaiaAdCard from "@/components/gaia-ad-card";

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-full max-w-400 mx-auto">
        <SidebarTrigger className="lg:hidden fixed top-20 left-4 z-50 shadow-md bg-background border rounded-md" />
        <Sidebar />
        <main className="flex-1 min-w-0 py-6">
          <div
            id="docs-content"
            className="prose dark:prose-invert w-full max-w-3xl mx-auto relative"
          >
            <DocsBreadcrumb />
            <DocsPageNav />
            {children}
          </div>
        </main>
        <aside className="w-60 shrink-0 hidden xl:block">
          <div className="sticky top-1 py-6 max-h-[calc(100vh-4rem)] overflow-auto">
            <TableOfContents />
            <GaiaAdCard />
          </div>
        </aside>
      </div>
    </SidebarProvider>
  );
}
