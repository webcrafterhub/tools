import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import googleIcon from "../assets/svg/googleIcon.svg";
import facebookIcon from "../assets/svg/facebookIcon.svg";
import linkedinIcon from "../assets/svg/linkedinIcon.svg";
import SigninForm from "@/components/SigninForm";
import Link from "next/link";
import ButtonDark from "@/components/ButtonDark";
import { signIn } from "next-auth/react";
import { defaultLoginRedirect } from "@/utils/routes";

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = ({}) => {
  function SocialLoginHandler(provider: string) {
    signIn(provider, {
      callbackUrl: defaultLoginRedirect,
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-full ml-2 font-medium whitespace-nowrap">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] p-8 border rounded-xl sm:rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center">Welcome Back !</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap mt-4 gap-6">
          <div className="w-3/12 max-w-full px-1 ml-auto flex-0">
            <div
              onClick={() => SocialLoginHandler("facebook")}
              className="flex items-center justify-center w-full px-6 py-3 mb-4 text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
            >
              <Image priority src={facebookIcon} alt="facebook signup" />
            </div>
          </div>
          <div className="w-3/12 max-w-full px-1 flex-0">
            <div
              onClick={() => SocialLoginHandler("google")}
              className="flex items-center justify-center w-full px-6 py-3 mb-4 text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
            >
              <Image priority src={googleIcon} alt="google signup" />
            </div>
          </div>
          <div className="w-3/12 max-w-full px-1 mr-auto flex-0">
            <div
              className="flex items-center justify-center w-full px-6 py-3 mb-4 text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
              onClick={() => SocialLoginHandler("linkedin")}
            >
              <Image priority src={linkedinIcon} alt="google signup" />
            </div>
          </div>
        </div>

        <SigninForm />
        <DialogFooter>
          <div className="flex-auto ">
            <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0">
              <hr className=" flex-shrink-0 border-t border-r border-l border-transparent h-0.5 my-6 border-b-0 opacity-25 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />

              <p className="absolute z-20 inline px-4 mb-2 text-sm font-semibold leading-normal -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2 text-slate-400">
                or
              </p>
            </div>
            <Link href="/signup" className="font-bold text-slate-700">
              <ButtonDark title="sign up" />
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
