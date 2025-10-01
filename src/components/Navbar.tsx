"use client";
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/components/hooks/useScroll";
import ThemeSwitcher from "./ThemeSwitcher";
import logo from "@/assets/img/logo.webp";

export default function NavBar() {
  const scrolled = useScroll(50);

  return (
    <>
      <div
        className={`sticky top-0 w-full flex justify-center ${
          scrolled
            ? "border-b dark:border-gray-900 border-gray-200 bg-white/50 dark:bg-black/80 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="flex items-center justify-between w-full h-16 max-w-screen-xl mx-5">
          <Link href="/" className="flex items-center text-2xl font-display">
            <Image src={logo} alt="Precedent logo" width="30" height="30" className="mr-2 rounded-sm"></Image>
            {/* <p>Precedent</p> */}
          </Link>
          <div className="flex gap-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
