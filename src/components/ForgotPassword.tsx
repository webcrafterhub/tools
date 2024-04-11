"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ButtonDark from "./ButtonDark";
import * as z from "zod";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
// import usePasswordForgot from "@/hooks/usePasswordForgot";
import { toast } from "./ui/use-toast";
import { SOMETHING_WENT_WRONG } from "@/utils/contants";
import { da } from "date-fns/locale";

interface ForgotPasswordProps {
  open: boolean;
  dialogHandler: () => void;
  email?: string;
}

type FormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
});

const resolver: Resolver<FormValues> = zodResolver(schema);

const ForgotPassword: FC<ForgotPasswordProps> = ({ open, dialogHandler, email }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  // const mutation = usePasswordForgot();
  const onSubmit = handleSubmit((data) => console.log(data));
  // useEffect(() => {
  //   if (mutation.isSuccess) {
  // toast({
  //   title: "Error",
  //   description: "Password reset sent successfully",
  //   variant: "destructive",
  // });
  //     dialogHandler();
  //   }
  //   if (mutation.isError) {
  //     toast.error(mutation.error.response?.data?.message || SOMETHING_WENT_WRONG);
  //   }
  // }, [mutation.isSuccess, mutation.isError]);
  return (
    <Dialog open={open} onOpenChange={dialogHandler}>
      <DialogContent>
        <form onSubmit={onSubmit} noValidate>
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Reset password</DialogTitle>
            <DialogDescription className="text-center">
              You will receive an e-mail in maximum 60 seconds
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
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

          <DialogFooter>
            <ButtonDark title="Send" loading={false} />
          </DialogFooter>
          <p className="mt-2 text-xs text-center opacity-30">Please check your inbox/spam folder for the email.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
