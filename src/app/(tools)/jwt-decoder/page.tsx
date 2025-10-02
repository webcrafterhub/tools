import React, { FC } from "react";
import { Metadata } from "next";
import JWTDecoder from "@/components/tools/jwt decoder/JWTDecoder";

export const metadata: Metadata = {
  title: "JWT Decoder & Editor | Create, Decode, and Verify JSON Web Tokens",
  description:
    "The ultimate JWT tool for decoding, editing, and creating JSON Web Tokens. Easily decode JWTs, verify signatures, edit claims, and generate new tokens with support for various algorithms and secret keys.",
  generator: "Next.js",
  applicationName: "WebCrafterHub",
  referrer: "origin-when-cross-origin",
  keywords: [
    "JWT Decoder",
    "JSON Web Token Decoder",
    "JWT Editor",
    "Create JWT",
    "JWT Verification",
    "JWT Tools",
    "JWT Generator",
    "Decode JWT",
    "JWT Claims Editor",
    "Token Creation",
    "JWT Signature Verification",
    "Online JWT Tools",
    "JWT Management",
    "WebCrafterHub",
    "Token Analysis",
    "JWT Online Editor",
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
      <JWTDecoder />
    </div>
  );
};

export default page;
