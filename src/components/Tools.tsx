import React, { FC } from "react";
import ToolBoxButton from "./ToolBoxButton";
import { BsFiletypeJson } from "react-icons/bs";
import { LuBookLock } from "react-icons/lu";
import { PiFileCloudBold } from "react-icons/pi";
import JWTIcon from "@/assets/img/jwt-icon.ico";
import Image from "next/image";

interface ToolsProps {}

const Tools: FC<ToolsProps> = ({}) => {
  return (
    <section id="features" className="container py-8 space-y-6 bg-slate-50 md:py-12 lg:py-24 dark:bg-transparent">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Tools</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Explore our collection and discover efficient, user-friendly solutions for all your digital needs.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <ToolBoxButton
          logo={<BsFiletypeJson className="text-5xl" />}
          heading="Json Fromatter"
          subHeading="JSON Formatting, Editing, Conversion, and Prettifying"
          redirectUrl="/json-formatter"
        />
        <ToolBoxButton
          logo={<LuBookLock className="text-5xl" />}
          heading="Base64 Encoder"
          subHeading="Base64 Encoding, URL-safe encoding, source character sets, file upload & download "
          redirectUrl="/base64-encoder"
        />
        <ToolBoxButton
          logo={<PiFileCloudBold className="text-4xl" />}
          heading="Base64 Decoder"
          subHeading="Base64 Decoding, source character sets, file upload & download "
          redirectUrl="/base64-decoder"
        />
        <ToolBoxButton
          logo={<Image src={JWTIcon} width={50} height={50} alt="jwt icon" />}
          heading="JWT Decoder"
          subHeading="JWT Decoder, JWT Editor, JWT Verification and JWT Generator"
          redirectUrl="/jwt-decoder"
        />
        <ToolBoxButton
          className="bg-gray-100 dark:bg-black opacity-80"
          logo=""
          heading="Coming Soon"
          subHeading="Exciting Developments Await: Coming Soon!"
          redirectUrl="/"
        />
        <ToolBoxButton
          className="bg-gray-100 dark:bg-black opacity-80"
          logo=""
          heading="Coming Soon"
          subHeading="Exciting Developments Await: Coming Soon!"
          redirectUrl="/"
        />
      </div>
    </section>
  );
};

export default Tools;
