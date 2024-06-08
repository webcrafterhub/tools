// import { UserButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";
import SidebarNav from "@/components/SidebarNav";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <SidebarNav />

      <div className="flex flex-col w-full min-h-screen bg-background">
        <main className="flex flex-grow w-full">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
