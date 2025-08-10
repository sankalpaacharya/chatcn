import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/footer";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "shadcn-collections",
  description: "Collection of components built with shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen overflow-hidden">
            <Navbar />
            <Separator />
            <div className="flex-1 min-h-0">{children}</div>
            <Separator />
            <Footer />
          </div>
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
