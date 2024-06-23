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
  title: "WebCrafterHub - Essential Tools for Daily Life",
  description:
    "Explore our collection and discover efficient, user-friendly solutions for all your digital needs. From JSON formatting to PDF compression, WebCrafterHub provides essential tools for daily life.",
  generator: "Next.js",
  applicationName: "WebCrafterHub",
  referrer: "origin-when-cross-origin",
  keywords: [
    "WebCrafterHub",
    "JSON Formatter",
    "PDF Compressor",
    "Online Tools",
    "Data Conversion",
    "JSON Converter",
    "JSON Editor",
    "JSON Prettifier",
  ],
  authors: [{ name: "Pranav M" }, { name: "WebCrafterHub Team", url: "https://webcrafterhub.com" }],
  creator: "Pranav M",
  publisher: "WebCrafterHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <DesignerContextProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
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
