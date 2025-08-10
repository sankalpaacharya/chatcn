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
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isCurrentPath = (href: string) => {
    if (!href) return false;
    return pathname === href;
  };

  return (
    <nav className="w-full px-4 md:px-8 flex items-center">
      <div className="flex py-2 items-center justify-between w-full mx-auto max-w-7xl">
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
        <div className="hidden md:flex gap-5 flex-1 justify-center">
          <Link
            href={"/docs"}
            className="font-bold py-2 px-3 hover:bg-muted rounded-md"
          >
            Docs
          </Link>
          <Link
            href={"/docs"}
            className="font-bold py-2 px-3 hover:bg-muted rounded-md"
          >
            Components
          </Link>
          <Link
            href={"https://github.com/sankalpaacharya/shadcn-collections"}
            className="font-bold py-2 px-3 hover:bg-muted rounded-md"
          >
            Github
          </Link>
        </div>

        <div className="ml-auto">
          {mounted && (
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          )}
        </div>
      </div>
    </nav>
  );
}
