"use server";

import prisma from "@/lib/prisma";
import { authFormSchema, authFormSchemaType } from "@/schemas/authForm";
import bcrypt from "bcryptjs";

export async function signUp(data: authFormSchemaType) {
  const validation = authFormSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("invalid data for signup");
  }
  const userExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userExist) {
    return { type: "error", data: "Email already exists" };
  }
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(data.password, 12),
    },
  });

  if (!user) {
    throw new Error("Something went wrong");
  }
  return { type: "sucess", data: user };
}
