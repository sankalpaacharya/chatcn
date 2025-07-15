"use client";
import React from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  const isCurrentPath = (href: string) => {
    if (!href) return false;
    return pathname === href;
  };
  return (
    <nav className="w-full md:px-8 flex md:justify-center justify-start">
      <div className="flex gap-5 py-2 items-center md:mx-auto max-w-7xl  px-4">
        <div className="md:hidden block">
          <Sheet>
            <SheetTrigger asChild>
              <button className="font-bold py-2 px-3 hover:bg-muted rounded-md">
                <Menu />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] ">
              <SheetTitle className="hidden">Collections</SheetTitle>
              <SidebarContent isCurrentPath={isCurrentPath} />
            </SheetContent>
          </Sheet>
        </div>
        <Link
          href={""}
          className="font-bold py-2 px-3 hover:bg-muted rounded-md"
        >
          Docs
        </Link>
        <Link
          href={""}
          className="font-bold py-2 px-3 hover:bg-muted rounded-md"
        >
          Components
        </Link>
        <Link
          href={""}
          className="font-bold py-2 px-3 hover:bg-muted rounded-md"
        >
          Github
        </Link>
      </div>
    </nav>
  );
}
