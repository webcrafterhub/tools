import React, { FC } from "react";
import WhiteCurdDesign from "../assets/img/curved-images/white-curved.jpeg";
import logo from "../assets/img/logo-ct.png";
import Image from "next/image";
import SideNavItem from "./SideNavItem";
import { Accordion } from "@/components/ui/accordion";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdCreate } from "react-icons/io";

interface SidebarNavProps {}

const SidebarNav: FC<SidebarNavProps> = ({}) => {
  return (
    <nav className="flex flex-col text-white max-w-[16rem] min-w-[16rem] pt-4 ml-5  ease-nav-brand z-990 fixed xl:sticky h-screen inset-0   w-full -translate-x-full flex-wrap   justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 -left-8 xl:left-0 xl:-translate-x-0 xl:bg-transparent ">
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex px-8 py-6 m-0 text-sm whitespace-nowrap ">
            <Image
              src={logo}
              className="h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8"
              alt="main_logo"
            />
            <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">Ebat</span>
          </div>
          <hr className="h-px bg-transparent bg-gradient-to-r from-transparent via-black/40 dark:via-white to-transparent" />
        </div>

        <div className="flex items-center justify-start gap-2 px-4 mx-4 my-0 text-sm font-bold transition-colors dark:bg-black-300 shadow-soft-xl text-slate-500 dark:text-white hover:no-underline ease-nav-brand whitespace-nowrap rounded-2xl">
          <div className="text-xl gradient__primary text-white shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-black-300  bg-center stroke-0 text-center xl:p-1.5">
            <IoMdCreate />
          </div>
          <span className="text-inherit">Create post</span>
        </div>
        <h6 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase text-slate-500 dark:text-white">Pages</h6>
        <Accordion type="single" collapsible className="flex flex-col gap-10 pl-0 mb-0 ">
          <SideNavItem title="Dashboard" icon={<BiSolidDashboard />} />

          <SideNavItem title="Tables" />
          <SideNavItem title="user" />
          <SideNavItem title="connections" />
          <SideNavItem title="know more" />
        </Accordion>
      </div>

      <div className="mx-4">
        {/* <!-- load phantom colors for card after: --> */}
        <p className="invisible hidden text-gray-800 text-red-500 text-red-600 after:bg-gradient-to-tl after:from-gray-900 after:to-slate-800 after:from-blue-600 after:to-cyan-400 after:from-red-500 after:to-yellow-400 after:from-green-600 after:to-lime-400 after:from-red-600 after:to-rose-400 after:from-slate-600 after:to-slate-300 text-lime-500 text-cyan-500 text-slate-400 text-fuchsia-500"></p>
        <div
          className="after:opacity-65 after:bg-gradient-to-tl after:from-slate-600 after:to-slate-300 relative flex min-w-0 flex-col items-center break-words rounded-2xl border-0 border-solid border-blue-900 bg-white bg-clip-border shadow-none after:absolute after:top-0 after:bottom-0 after:left-0 after:z-10 after:block after:h-full after:w-full after:rounded-2xl after:content-['']"
          sidenav-card
        >
          <div
            className="mb-7.5 absolute h-full w-full rounded-2xl bg-cover bg-center"
            style={{
              backgroundImage: `url('../assets/img/curved-images/white-curved.jpeg')}`,
            }}
          ></div>
          <div className="relative z-20 flex-auto w-full p-4 text-left text-white">
            <div className="flex items-center justify-center w-8 h-8 mb-4 text-center bg-white bg-center rounded-lg icon shadow-soft-2xl">
              <i className="top-0 z-10 text-lg leading-none text-transparent ni ni-diamond bg-gradient-to-tl from-slate-600 to-slate-300 bg-clip-text opacity-80">
                Icon
              </i>
            </div>
            <div className="transition-all duration-200 ease-nav-brand">
              <h6 className="mb-0 text-white">Need help?</h6>
              <p className="mt-0 mb-4 text-xs font-semibold leading-tight">Please check our docs</p>
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/soft-ui-dashboard/"
                target="_blank"
                className="inline-block w-full px-8 py-2 mb-0 text-xs font-bold text-center text-black uppercase transition-all ease-in bg-white border-0 border-white rounded-lg shadow-soft-md bg-150 leading-pro hover:shadow-soft-2xl hover:scale-102"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>
        {/* <!-- pro btn  --> */}
        <a
          className="inline-block w-full px-6 py-3 my-4 text-xs font-bold text-center text-white uppercase align-middle transition-all ease-in border-0 rounded-lg select-none shadow-soft-md bg-150 bg-x-25 leading-pro gradient__primary hover:shadow-soft-2xl hover:scale-102"
          target="_blank"
          href="https://www.creative-tim.com/product/soft-ui-dashboard-pro-tailwind?ref=sidebarfree"
        >
          Upgrade to pro
        </a>
      </div>
    </nav>
  );
};

export default SidebarNav;
