import React, { FC } from "react";
import ToolBoxButton from "./ToolBoxButton";
import { BiSolidFileJson } from "react-icons/bi";

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
          logo={<BiSolidFileJson className="text-5xl" />}
          heading="Json Fromatter"
          subHeading="JSON Formatting, Editing, Conversion, and Prettifying"
          redirectUrl="/json-formatter"
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