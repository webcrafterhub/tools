import JSONFormatter from "@/components/tools/json-formatter/JSONFormatter";
import React, { FC } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter",
  description:
    "JSON Formatter to easily format, edit, and convert your JSON data. Perfect for developers and data analysts.",
  generator: "Next.js",
  applicationName: "WebCrafterHub",
  referrer: "origin-when-cross-origin",
  keywords: [
    "JSON Formatter",
    "JSON Converter",
    "JSON Editor",
    "JSON Prettifier",
    "WebCrafterHub",
    "Online Tools",
    "Data Conversion",
    "json",
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

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="">
      <JSONFormatter />
    </div>
  );
};

export default page;
