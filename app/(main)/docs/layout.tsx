import React, { ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DocsBreadcrumb from "@/components/docs-breadcrumb";
import TableOfContents from "@/components/table-of-contents";
import GaiaAdCard from "@/components/gaia-ad-card";

export default function DocLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <SidebarTrigger className="lg:hidden fixed top-20 left-4 z-50 shadow-md bg-background border rounded-md" />
        <Sidebar />
        <main className="flex-1 min-w-0 px-5 md:px-8 lg:px-12 overflow-auto">
          <div
            id="docs-content"
            className="prose dark:prose-invert w-full max-w-3xl lg:max-w-4xl mx-auto py-10 prose-h1:m-0 prose-p:m-1 prose-p:text-primary"
          >
            <DocsBreadcrumb />
            {children}
          </div>
        </main>
        <aside className="w-100 shrink-0 hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-auto left-0">
            <TableOfContents />
            <GaiaAdCard />
          </div>
        </aside>
      </div>
    </SidebarProvider>
  );
}
