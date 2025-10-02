"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { FC } from "react";

interface ToolBoxButtonProps {
  logo: any;
  heading: string;
  subHeading: string;
  redirectUrl: string;
  className?: string;
}

const ToolBoxButton: FC<ToolBoxButtonProps> = ({ logo, heading, subHeading, redirectUrl, className }) => {
  const pathname = usePathname();
  // If we're on root path, just use the redirectUrl directly
  // Otherwise, append to current path
  const href = pathname === '/' ? redirectUrl : `${pathname}${redirectUrl}`;
  
  return (
    <Link
      href={href}
      className={cn("list-none border rounded-lg bg-background relative overflow-hidden md:cursor-pointer", className)}
    >
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6 gap-2">
        {logo}
        <div className="space-y-2">
          <h3 className="font-bold">{heading}</h3>
          <p className="text-sm text-muted-foreground capitalize">{subHeading}</p>
        </div>
      </div>
    </Link>
  );
};

export default ToolBoxButton;
