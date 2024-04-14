"use client";
import React, { useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ButtonBlue from "./ButtonBlue";
// import useLoginUser from '@/hooks/useLoginUser';
import { toast } from "./ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { EMAIL_NOT_VERIFIED, Email_VERIFICATION, SOMETHING_WENT_WRONG } from "@/utils/contants";
import ForgotPassword from "./ForgotPassword";
import { logIn } from "@/actions/auth";
import VerifyEmailModal from "./ui/VerifyEmailModal";

type FormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Please enter your password"),
});

const resolver: Resolver<FormValues> = zodResolver(schema);

export default function SigninForm() {
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [openEmailVerification, setOpenEmailVerification] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  // const mutation = useLoginUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const verificationEmail = searchParams.get(Email_VERIFICATION);
  console.log("pranuu", verificationEmail);

  useEffect(() => {
    if (verificationEmail) {
      setOpenEmailVerification(true);
      setUserData({ email: verificationEmail });
    }
  }, []);

  const onSubmit = handleSubmit(async (userData) => {
    setUserData(userData);
    const { type, data, cause } = await logIn(userData);

    if (type === "success") {
      router.push("/signin");
      return;
    }
    if (type === "error") {
      if (cause === EMAIL_NOT_VERIFIED) {
        setOpenEmailVerification(true);
        return;
      }
      return toast({
        title: "Error",
        description: String(data),
        variant: "destructive",
      });
    }
  });

  return (
    <>
      <form onSubmit={onSubmit} className="text-left" noValidate>
        <div className="mb-4">
          <input
            {...register("email")}
            type="email"
            className={cn(
              "text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow",
              { "border-red-500": errors?.email },
            )}
            placeholder="Email"
            aria-label="Email"
          />
          {errors?.email && <p className="text-sm text-red-500 dark:text-red-900">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <input
            {...register("password")}
            type="password"
            className={cn(
              "text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow",
              { "border-red-500": errors?.password },
            )}
            placeholder="Password"
            aria-label="Password"
          />
          {errors?.password && <p className="text-sm text-red-500 dark:text-red-900">{errors.password.message}</p>}
        </div>
        <div className="flex justify-end w-full text-xs text-slate-500 ">
          <button
            aria-label="forgot password"
            onClick={(e) => {
              e.preventDefault();
              setOpenResetDialog(true);
            }}
          >
            Forgot password ?
          </button>
        </div>
        <div className="text-center">
          <ButtonBlue type="submit" title="sign in" loading={false} />
        </div>
      </form>
      {openResetDialog && (
        <ForgotPassword
          open={openResetDialog}
          dialogHandler={() => setOpenResetDialog((prev) => !prev)}
          email={userData?.email}
        />
      )}
      {openEmailVerification && (
        <VerifyEmailModal
          open={openEmailVerification}
          dialogHandler={() => setOpenEmailVerification((prev) => !prev)}
          email={userData?.email || ""}
        />
      )}
    </>
  );
}
