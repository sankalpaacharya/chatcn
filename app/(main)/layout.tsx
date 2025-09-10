import React from "react";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Toaster position="top-center" />
      <div className="flex-1 overflow-x-hidden font-sans">{children}</div>
    </div>
  );
}
