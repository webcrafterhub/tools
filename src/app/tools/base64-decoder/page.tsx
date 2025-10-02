import React, { FC } from "react";
import { Metadata } from "next";
import Base64Decoder from "@/components/tools/base64Convertor/Base64Decoder";

export const metadata: Metadata = {
  title: "Base64 Decoder",
  description:
    "Base64 Decoder to easily decode your Base64 data. Supports uploading files, copy-paste, different character sets, file download and URL-safe decoding.",
  generator: "Next.js",
  applicationName: "WebCrafterHub",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Base64 Decoder",
    "Data Decoding",
    "File Decoding",
    "URL-safe Decoding",
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
      <Base64Decoder />
    </div>
  );
};

export default page;
