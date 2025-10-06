"use client";
import React from "react";
import { Menu, Sun, Moon, Github, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SidebarContent } from "./sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "https://chatcn-template.vercel.app", label: "Templates" },
  { href: "/examples", label: "Examples" },
  { href: "/marketplace", label: "Marketplace"}
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isActive = (href: string) => pathname === href;
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const Logo = ({ className = "" }) => (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <MessageCircle className="h-5 w-5" />
      <span className="font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        chatcn
      </span>
    </Link>
  );

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium transition-all rounded-lg hover:bg-accent`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 w-full">
      <div className="flex h-16 items-center px-4 md:px-8">
        <Sheet>
          <SheetTrigger asChild className="xl:hidden mr-2">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px]">
            <SheetTitle className="hidden">Navigation Menu</SheetTitle>
            <SidebarContent isCurrentPath={isActive} />
          </SheetContent>
        </Sheet>

        <Logo className="mr-6 hidden xl:flex" />

        <div className="flex flex-1 items-center justify-between">
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map(({ href, label }) => (
              <NavLink key={href} href={href}>
                {label}
              </NavLink>
            ))}
          </nav>

          <Logo className="xl:hidden text-lg" />

          <div className="flex items-center space-x-2 ml-auto">
            <Button variant="ghost" size="icon" asChild className="inline-flex">
              <Link
                href="https://github.com/sankalpaacharya/shadcn-collections"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>

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
