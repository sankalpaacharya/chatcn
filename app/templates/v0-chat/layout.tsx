import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "V0-Style Chat Template | shadcn-collections",
  description: "Clean, minimalist chat interface inspired by V0's design",
};

export default function V0ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
