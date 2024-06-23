import React, { FC } from "react";
import { Metadata } from "next";
import Base64Encoder from "@/components/tools/base64Convertor/Base64Encoder";

export const metadata: Metadata = {
  title: "Base64 Encoder",
  description:
    "Base64 Encoder to easily encode your data. Supports uploading files, copy-paste, different character sets, file download and URL-safe encoding.",
  generator: "Next.js",
  applicationName: "WebCrafterHub",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Base64 Encoder",
    "Data Encoding",
    "File Encoding",
    "URL-safe Encoding",
    "Online Tools",
    "WebCrafterHub",
    "Data Conversion",
    "Base64",
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
      <Base64Encoder />
    </div>
  );
};

export default page;
