"use client";

import React from "react";
import Link from "next/link";
import { Menu, Sun, Moon, Github, MessageCircle } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "https://chatcn-template.vercel.app", label: "Templates" },
  { href: "/marketplace", label: "Marketplace" },
];


export default function Navbar({
  sidebar,
}: {
  sidebar?: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-dotted bg-background">
      <div className="flex h-16 items-center px-4 md:px-8">

        {sidebar && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="xl:hidden mr-2">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-0">
              <SheetTitle className="hidden">Navigation</SheetTitle>
              <div className="h-full">{sidebar}</div>
            </SheetContent>
          </Sheet>
        )}


        <Logo className="mr-6 hidden xl:flex" />

        <div className="flex flex-1 items-center justify-between">

          <nav className="hidden xl:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>


          <Logo className="xl:hidden" />


          <div className="flex items-center space-x-2 ml-auto">
            <IconButton
              href="https://github.com/sankalpaacharya/shadcn-collections"
              label="GitHub"
            >
              <Github className="h-5 w-5" />
            </IconButton>

            {mounted && (
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <MessageCircle className="h-5 w-5" />
      <span className="font-bold bg-clip-text text-transparent from-primary to-primary/80">
        chatcn
      </span>
    </Link>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-accent"
    >
      {children}
    </Link>
  );
}

function IconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only">{label}</span>
      </Link>
    </Button>
  );
}
