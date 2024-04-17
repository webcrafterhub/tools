"use client";
import React, { FC, useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import backgroundImg from "@/assets/img/resetBackground.jpg";
import ButtonDark from "@/components/ButtonDark";
import { useRouter } from "next/navigation";
import { SOMETHING_WENT_WRONG } from "@/utils/contants";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
interface pageProps {}

type FormValues = {
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least one special character (!@#$%^&*)",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const resolver: Resolver<FormValues> = zodResolver(schema);

const ResetPassword: FC<pageProps> = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit((data: { password: string }) => {
    console.log({ password: data.password, token });
  });
  return (
    <div className="m-0 mt-0 font-sans text-base antialiased font-normal transition-all duration-200 bg-white ease-soft-in-out text-start leading-default text-slate-500">
      <section className="max-h-screen">
        <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-[75vh]">
          <div className="container z-10">
            <div className="flex flex-wrap mt-0 -mx-3">
              <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
                <div className="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                  <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                    <h4 className="relative z-10 font-bold text-center text-transparent md:text-2xl lg:text-3xl md:text-left bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">
                      Reset your password
                    </h4>
                    <p className="mb-0 text-center md:text-left">Enter a new password for your account.</p>
                  </div>
                  <div className="flex-auto p-6">
                    <form role="form" onSubmit={onSubmit} noValidate>
                      <div className="mb-4">
                        <input
                          {...register("password")}
                          type="password"
                          className={cn(
                            "text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow",
                            {
                              "border-red-500": errors?.password,
                            },
                          )}
                          placeholder="Password"
                          aria-label="Password"
                        />
                        {errors?.password && (
                          <p className="text-sm text-red-500 dark:text-red-900">{errors.password.message}</p>
                        )}
                      </div>
                      <div className="mb-4">
                        <input
                          {...register("confirmPassword")}
                          type="password"
                          className={cn(
                            "text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow",
                            {
                              "border-red-500": errors?.password,
                            },
                          )}
                          placeholder=" Confirm password"
                          aria-label="Password"
                        />
                        {errors?.confirmPassword && (
                          <p className="text-sm text-red-500 dark:text-red-900">{errors.confirmPassword.message}</p>
                        )}
                      </div>

                      <div className="text-center">
                        <ButtonDark type="submit" title="Reset Password" loading={false} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full px-3 lg:flex-grow-0 lg:flex-shrink-0  shrink-0 md:w-6/12">
                <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-12 -right-40 rounded-bl-xl md:block">
                  <div
                    className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover "
                    style={{
                      backgroundImage: `url(${backgroundImg.src})`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
