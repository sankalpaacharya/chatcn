"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CircleUser } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

type LoginManagerProps = {
  wallpaper?: string;
  portal?: boolean;
};

export function LoginManager({
  wallpaper = "/images/jump.png",
  portal = false,
}: LoginManagerProps) {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => {
      setMounted(false);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!active && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        setActive(true);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [active]);

  if (!mounted) return null;

  const content = (
    <div
      className={cn(
        "absolute inset-0 z-[9999] h-full w-full bg-cover bg-center bg-no-repeat transition-opacity duration-500 overflow-hidden",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div
        className={cn(
          "absolute inset-0 z-10 bg-black/40",
          active && "backdrop-blur-md"
        )}
      />

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div
            key="first"
            initial={{ y: 0 }}
            animate={{ y: active ? "-100%" : 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-30"
          >
            <FirstScreen />
          </motion.div>
        ) : (
          <div className="absolute inset-0 z-40">
            <PasswordScreen />
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  return portal ? createPortal(content, document.body) : content;
}

export function FirstScreen() {
  return (
    <div className="h-full w-full flex flex-col items-center text-white relative">
      <div className="flex flex-col items-center space-y-3 mt-20">
        <div className="text-6xl font-bold">01:58</div>
        <div className="text-lg">Monday, November 2 2025</div>
      </div>
      <p className="text-lg italic text-muted-foreground absolute bottom-10">
        Press &quot;Space&quot; or &quot;Enter&quot; to login
      </p>
    </div>
  );
}

export function PasswordScreen() {
  return (
    <div className="h-full w-full flex items-center justify-center text-white relative">
      <div className="flex flex-col items-center space-y-4">
        <CircleUser className="size-24 opacity-90" />
        <span className="text-2xl font-semibold">Sanku</span>
        <Input type="password" autoFocus className="p-2" />
        <p className="text-sm text-primary/60 mt-3 font-light italic">
          Press Enter to unlock
        </p>
      </div>
    </div>
  );
}
