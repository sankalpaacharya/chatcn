import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chatcn.me"),
  title: {
    default: "Chatcn — Design Chatapp UI with Chatcn",
    template: "%s | Chatcn",
  },
  description:
    "Chatcn is a UI component library built with shadcn for AI chat applications. Copy-paste ready-made, beautiful, and accessible components like prompt inputs, code blocks, and chat layouts - build faster without worrying about design.",
  keywords: [
    "ChatCN",
    "UI component library",
    "chat components",
    "AI chat UI",
    "prompt input",
    "code block",
    "shadcn components",
    "calendar",
    "chat container",
    "code editor",
    "codeblock",
    "command block",
    "command tabs",
    "email",
    "file",
    "markdown",
    "message",
    "prompt suggestion",
    "shadow scrollbar",
    "signup",
    "source",
    "thought",
    "thread",
    "tool",
    "weather",
  ],
  authors: [{ name: "Chatcn" }],
  creator: "Chatcn",
  publisher: "Chatcn",
  openGraph: {
    type: "website",
    url: "https://chatcn.me",
    siteName: "Chatcn",
    title: "Chatcn — Design Chatapp UI with Chatcn",
    description:
      "Customizable components for building AI chat applications faster. Ready-to-use, beautiful, and accessible UI components built with shadcn.",
    images: [
      {
        url: "https://chatcn.me/og-default.png",
        width: 1200,
        height: 630,
        alt: "Chatcn Preview",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatcn — Design Chatapp UI with Chatcn",
    description:
      "Copy and paste beautiful, production-ready chat UI components built with shadcn. Build AI chat interfaces faster than ever.",
    images: ["https://chatcn.me/og-default.png"],
    creator: "@chatcn",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="1705"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
