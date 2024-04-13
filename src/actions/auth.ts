"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { defaultLoginRedirect } from "@/utils/routes";
import { authFormSchema, authFormSchemaType } from "@/schemas/authForm";
import {
  EMAIL_ALREADY_EXISTS_ERROR,
  INVALID_USERNAME_PASSWORD_ERROR,
  SOMETHING_WENT_WRONG_ERROR,
} from "@/utils/errors";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function signUp(data: authFormSchemaType) {
  const validateFields = authFormSchema.safeParse(data);
  if (!validateFields.success) {
    return INVALID_USERNAME_PASSWORD_ERROR;
  }
  const userExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userExist) {
    return EMAIL_ALREADY_EXISTS_ERROR;
  }
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(data.password, 12),
    },
  });

  if (!user) {
    return SOMETHING_WENT_WRONG_ERROR;
  }
  return { type: "sucess", data: user };
}

export async function logIn(data: authFormSchemaType) {
  const validateFields = authFormSchema.safeParse(data);
  if (!validateFields.success) {
    return INVALID_USERNAME_PASSWORD_ERROR;
  }
  const { email, password } = validateFields.data;
  try {
    await signIn("credentials", { email, password, redirectTo: defaultLoginRedirect });
    return { type: "sucess", data: "" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return INVALID_USERNAME_PASSWORD_ERROR;
        case "CallbackRouteError":
          return INVALID_USERNAME_PASSWORD_ERROR;
        default:
          return INVALID_USERNAME_PASSWORD_ERROR;
      }
    }
    throw error;
  }
}
