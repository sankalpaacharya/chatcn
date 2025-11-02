"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, Check, Github } from "lucide-react";
import { sidebarLinks } from "@/components/sidebar";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/chatcn/ai/message";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextArea,
} from "@/components/chatcn/ai/prompt-input";
import { Spotlight } from "@/components/ui/spotlight-new";
import ClickSpark from "@/components/ClickSpark";
import Image from "next/image";
import clsx from "clsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  const newItem = sidebarLinks.find(item => item.isNew);

  useEffect(() => setIsMounted(true), []);

interface CardProps {
  title: string;
  imgSeed: string;          
  bg?: string;
  className?: string;
  link: string;
}

const Card = ({ title, imgSeed, className, link }: CardProps) => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      className={clsx(
        "relative w-64 h-32 preserve-3d group transition-transform duration-300",
        className
      )}
      style={{
        transform: "rotate(-28deg) skewX(12deg)",
        transformStyle: "preserve-3d",
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const isFront = i === 4;
        const depth = i * 12;
        const op = isFront ? 1 : (i + 1) * 0.18;
        const translate = hover
          ? `translate(${depth * 1.3}px, ${-depth * 1.3}px)`
          : active && isFront
          ? `translate(${depth * 0.7}px, ${-depth * 0.7}px)`
          : "";

        return (
          <Link key={i} href={link}>
          <span
            className={clsx(
              "absolute inset-0 rounded-xl shadow-2xl flex flex-col items-center justify-center p-3 text-accent-foreground transition-all duration-300 ease-out",
              isFront && "group-hover:shadow-[0_0_45px_rgba(255,255,255,0.55)]"
            )}
            style={{
              zIndex: 50 - i * 10,
              opacity: hover ? op : 1,
              transform: translate,
            }}
          >
            {isFront && (
              <div className="flex flex-col items-center justify-center h-full w-full bg-black rounded-lg">
                <div
                  className="absolute inset-2 rounded-lg opacity-30 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, transparent 70%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center p-3 bg-black rounded-lg">
                  <Image
                    src={imgSeed}
                    height={500}
                    width={500}
                    alt={title}
                    className="w-full h-full scale-170 object-contain rotate-42 rotate-y-50"
                  />
                </div>
              </div>
            )}
          </span>
          </Link>
        );
      })}
      <div
        className="absolute bottom-[-10px] left-[-6px] w-full h-3 shadow-xl shadow-cyan-50"
        style={{ transform: "skewX(-41deg)", zIndex: 5 }}
      />
      <div
        className="absolute top-1 left-[-10px] w-3 h-full shadow-xl shadow-cyan-50"
        style={{ transform: "skewY(-49deg)", zIndex: 5 }}
      />
    </div>
  );
};

  return (
    <ClickSpark
      sparkColor="currentColor"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="min-h-screen flex flex-col px-8">
        <Spotlight />
        {theme === "dark" && isMounted && (
          <div
            className="absolute inset-0 -z-10"
          />
        )}
        <div className="flex flex-row h-screen">
          <div className="font-lora space-y-6 flex flex-col items-start justify-center py-20 md:py-28">
          <Link href="https://github.com/sankalpaacharya/chatcn" target="_blank" rel="noopener noreferrer">
          <div className="relative group cursor-pointer overflow-hidden rounded-full">
            <TooltipProvider delayDuration={0}>
            <Tooltip>
            <TooltipTrigger asChild>
            <div className="flex items-center chasing-border justify-center gap-2 rounded-full bg-transparent border-1 px-8 py-2 text-sm text-accent-foreground transition-all group-hover:bg-white/10">
              <span>Show me the code</span>
              <Github className="h-4 w-4"/>
            </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-center text-sm" side="top" align="center" sideOffset={12} avoidCollisions={true}>
              <p>Starring this repo improves your AI model. Source: Trust me bro.</p>
            </TooltipContent>
            </Tooltip>
            </TooltipProvider>
          </div>
          </Link>
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-tight`}
            >
              <span className="block text-accent-foreground/70">Build AI Chat UIs <br/></span>
              <pre className="font-lora font-normal block text-accent-foreground/70">              with a <span className="text-accent-foreground">lot</span><br/></pre>
              <span>lesser BUILDING<br/></span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              Customizable components for building AI chat applications faster.
              Ready-to-use, beautiful, and accessible UI components.
            </p>

            <div className="flex flex-wrap gap-4 justify-start pt-4">
              <Link href="/docs">
                <Button className="rounded-md px-6 py-5 text-sm">
                  Get Started
                </Button>
              </Link>
              <Link href="/docs/">
                <Button
                  variant="outline"
                  className="rounded-md px-6 py-5 text-sm"
                >
                  View Components
                </Button>
              </Link>
            </div>
          
        </div>
        
        
        <div className="hidden lg:flex w-full lg:w-1/2 lg:order-2 relative items-center justify-center py-12 lg:py-0">
  <div className="grid gap-y-18 justify-items-center scale-75 sm:scale-90 lg:scale-100">

    <div className="flex justify-center gap-26">
      <Card title="CodeEditor"    imgSeed="/code.svg"           className="translate-x-18 translate-y-16.5" link="/docs/component/code-editor" />
      <Card title="Tool"         imgSeed="/tool.svg"          className="translate-x-16 translate-y-16" link="/docs/component/tool"/>
    </div>

    <div className="flex justify-center gap-26">
      <Card title="ChatContainer" imgSeed="/chat-container.svg" className="translate-x-6 translate-y-10" link="/docs/component/chat-container"/>
      <Card title="Calendar"      imgSeed="/calendar.svg"       className="translate-y-8 -translate-x-6" link="/docs/component/calendar"/>
      <Card title="File"          imgSeed="/file-block.svg"     className="-translate-x-12 translate-y-16" link="/docs/component/file"/>
    </div>

    <div className="flex justify-center gap-26">
      <Card title="Source"        imgSeed="/source.svg"         className="translate-x-28" link="/docs/component/source"/>
      <Card title="CodeBlock"     imgSeed="/code-block.svg"     className="translate-x-16" link="/docs/component/codeblock"/>
      <Card title="CommandBlock"  imgSeed="/command-block.svg"  className="-translate-x-52 translate-y-32" link="/docs/component/command-block"/>
    </div>

    <div className="flex justify-center">
      <Card title="PromptInput" imgSeed="/prompt-input.svg" className="-translate-x-50 -translate-y-12" link="/docs/component/prompt-input"/>
    </div>

      </div>
    </div>
  </div>

  <div className="my-24 relative rounded-2xl p-8 shadow-2xl border border-foreground/60 overflow-hidden mx-auto
                group cursor-pointer transition-all duration-150 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
  <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

  <div className="relative">
    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
      <div className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
      <span>NEW RELEASE</span>
    </div>

    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <h2 className="text-3xl font-bold text-accent-foreground group-hover:text-foreground/90 transition-colors" style={{
        fontFamily: 'cursive',
        filter: 'brightness(1.1) contrast(1.2)',
      }}>
        {newItem && <span>{newItem.label}</span>}
      </h2>

      <div className="flex-1">
        <p className="font-lora text-xl text-accent-foreground leading-tight group-hover:text-foreground transition-colors">
          Composable and reusable just for you.
        </p>
        <Link 
          href={newItem!.href} 
          className="inline-block mt-3 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition"
        >
          Learn more
        </Link>
      </div>
    </div>
  </div>
</div>
<div className="w-full max-w-2xl h-px rounded-xl bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-12"></div>

      <div className="flex flex-wrap justify-center gap-6 pt-2">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check size={16} className="text-primary" /> Customizable
        </span>
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check size={16} className="text-primary" />{" "}
          Accessibility-focused
        </span>
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check size={16} className="text-primary" /> Open Source
        </span>
      </div>
        

        <div className="w-full max-w-5xl mx-auto py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="md:col-span-2 lg:col-span-3">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold mb-2">
                  Try Our AI Chat Interface Components
                </h2>
                <p className="text-muted-foreground">
                  Pre-built and ready to integrate into your applications
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-start-2 lg:col-span-1">
            <div className="flex justify-center">
              <div className="w-full">
                <ChatCard />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-2xl h-px rounded-xl bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-6"></div>
        <div className="flex flex-col justify-center items-center py-24">
          <Image src="/wormholed.webp" height={500} width={500} alt="wormhole" className={isMounted && theme==="dark" ? "" : "invert"}/>
          <div className="flex flex-col font-lora justify-center items-center max-w-md gap-6">
            <p className="text-3xl text-center">Discover something <span className="italic text-4xl" style={{fontFamily:'cursive'}}>New</span></p>
            <p className="text-md text-center"> Leverage the power of open source to explore and contribute creative components built by the community. </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center py-8">
              <Link href="/marketplace">
                <Button className="rounded-md px-6 py-5 text-sm">
                  Visit Marketplace
                </Button>
              </Link>
              <Link href="/docs/">
                <Button
                  variant="outline"
                  className="rounded-md px-6 py-5 text-sm"
                >
                  View Components
                </Button>
              </Link>
            </div>
        </div>
        <div className="w-full max-w-2xl h-px rounded-xl bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto my-6"></div>
        <Footer/>
      </div>
    </ClickSpark>
  );
}


function Footer() {
  const [hovered, setHovered] = useState<Set<number>>(new Set());

  const handleHover = (index: number) => {
    setHovered(prev => new Set(prev).add(index));
    setTimeout(() => {
      setHovered(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }, 800);
  };

  return (
    <footer className="w-full bg-background text-center text-white py-12 relative flex items-center justify-center gap-8 overflow-hidden">
    <div className="absolute hidden sm:grid left-0 top-1/2 transform -translate-y-1/2 grid-cols-18 gap-3 max-h-64 overflow-hidden">
      {[...Array(90)].map((_, i) => (
        <span
          key={i}
          onMouseEnter={() => handleHover(i)}
          className={`cursor-pointer transition-all duration-300 transform ${
            hovered.has(i) ? 'text-foreground/70 scale-150' : 'text-foreground/28'
          }`}
        >
          +
        </span>
      ))}
    </div>
    <div className="flex flex-col items-center gap-4 z-10">
      <Image 
        src="/favicon.ico" 
        alt="Logo" 
        height={50}
        width={50}
        className="opacity-90 hover:opacity-100 transition"
      />
      <p className="text-sm text-gray-400 max-w-md leading-relaxed">
        Chat UIs without the headache. You are welcome.
      </p>
      <p className="text-md text-foreground mt-2">
        © 2025 ChatCN.
      </p>
    </div>
    <div className="absolute hidden sm:grid right-0 top-1/2 transform -translate-y-1/2 grid-cols-18 gap-3 max-h-64 overflow-hidden">
      {[...Array(90)].map((_, i) => (
        <span
          key={`right-${i}`}
          onMouseEnter={() => handleHover(i + 1000)}
          className={`cursor-pointer transition-all duration-300 transform ${
            hovered.has(i + 1000) ? 'text-foreground/70 scale-150' : 'text-foreground/28'
          }`}
        >
          +
        </span>
      ))}
    </div>
  </footer>
  
  );
}


function ChatCard() {
  return (
    <div className="w-full space-y-4 p-6 border border-border/40 rounded-xl bg-card/50 backdrop-blur-sm shadow-md relative overflow-hidden max-w-lg mx-auto">
      <div className="absolute top-0 left-0 right-0 h-10 bg-background/90 backdrop-blur-sm border-b border-border/40 flex items-center px-4">
        <div className="flex space-x-1.5 absolute left-3">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <div className="mx-auto text-xs text-muted-foreground">ChatCN Demo</div>
      </div>

      <div className="mt-6 pt-4 space-y-5">
        <Message>
          <MessageAvatar
            src="https://github.com/"
            alt="AI"
            className="w-8 h-8"
          />
          <MessageContent className="bg-transparent text-sm">
            Hello! I&apos;m a demo of the ChatCN components. Ask me anything
            about these UI components.
          </MessageContent>
        </Message>

        <Message className="justify-end">
          <MessageContent className="text-sm max-w-sm">
            What makes ChatCN components special?
          </MessageContent>
        </Message>

        <Message>
          <MessageAvatar
            src="https://github.com/"
            alt="AI"
            className="w-8 h-8"
          />
          <MessageContent className="bg-transparent text-sm">
            ChatCN provides beautifully designed, accessible, and customizable
            UI components specifically for AI chat interfaces. They&apos;re easy
            to integrate, fully responsive, and work seamlessly with
            shadcn&apos;s design system.
          </MessageContent>
        </Message>
      </div>

      {/* Input */}
      <div className="flex justify-center mt-6">
        <PromptInput className="w-full">
          <PromptInputTextArea
            placeholder="Tell me anything"
            className="text-sm min-h-[40px]"
          />
          <PromptInputActions className="justify-end pt-2">
            <PromptInputAction tooltip="submit">
              <Button
                variant="default"
                size="icon"
                className="h-7 w-7 rounded-full"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </Button>
            </PromptInputAction>
          </PromptInputActions>
        </PromptInput>
      </div>
    </div>
  );
}
