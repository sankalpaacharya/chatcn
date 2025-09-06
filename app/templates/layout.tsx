import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat UI Templates | shadcn-collections",
  description:
    "Ready-to-use AI chat interface templates built with shadcn components",
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
