import DesignerContextProvider from "@/components/context/DesignerContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import React from "react";
import Nav from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ebat | Sign in",
  description: "Sign in form",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <DesignerContextProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="bg-home-gradient dark:bg-none">
              <Nav />
              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        </DesignerContextProvider>
      </body>
    </html>
  );
}
