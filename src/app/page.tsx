import Link from "next/link";
import Twitter from "@/assets/svg/Twitter";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Tools from "@/components/Tools";
import FooterOpenSource from "@/components/FooterOpenSource";
import { links } from "@/utils/siteConfig";

export default async function IndexPage() {
  return (
    <>
      <section className="pt-6 pb-8 space-y-6 md:pb-12 md:pt-10 lg:py-32 ">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={links.twitter}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center py-2 mx-auto mb-5 space-x-2 overflow-hidden transition-colors bg-blue-100 rounded-full dark:bg-gray-900 dark:hover:bg-background max-w-fit animate-fade-up px-7 hover:bg-blue-200"
          >
            <Twitter className="h-5 w-5 text-[#1d9bf0]" />
            <p className="text-sm font-semibold text-[#1d9bf0]">@WebCreafterHub</p>
          </Link>
          <h1 className="font-sans text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Web Crafter Hub
          </h1>
          <p className="max-w-[42rem] font-display leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Elevate Your Development with an All-in-One Hub!
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <Tools />
      <FooterOpenSource />
    </>
  );
}
