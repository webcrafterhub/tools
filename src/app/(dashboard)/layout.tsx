import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
// import { UserButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";
import SidebarNav from "@/components/SidebarNav";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <SidebarNav />

      <div className="flex flex-col w-full min-h-screen bg-background">
        <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
          <Logo />
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            {/* <UserButton afterSignOutUrl="/sign-in" /> */}
          </div>
        </nav>
        <main className="flex flex-grow w-full">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
