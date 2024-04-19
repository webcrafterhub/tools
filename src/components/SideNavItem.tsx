import React, { FC } from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface SideNavItemProps {
  title: string;
  className?: string;
  icon?: any;
}

const SideNavItem: FC<SideNavItemProps> = ({ title, className, icon }) => {
  return (
    <AccordionItem value={title} className="p-0 border-0 text-slate-700 dark:text-white text-inherit">
      <AccordionTrigger
        className={cn(
          "py-2.7  hover:no-underline flex items-center  text-sm ease-nav-brand my-0 mx-4  whitespace-nowrap rounded-2xl  px-4 transition-colors ",
          className,
        )}
      >
        <div className="flex items-center justify-center gap-2 text-inherit dark:text-white">
          <div className="text-lg shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-black-300 dark:text-white bg-center stroke-0 text-center xl:p-1.5">
            {icon}
          </div>
          <span className="text-slate-700 dark:text-white">{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-slate-700 dark:text-inherit">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  );
};

export default SideNavItem;
