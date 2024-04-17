"use server";

import prisma from "@/lib/prisma";

export async function findUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
}
export async function findUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
}

export async function setEmailVerified(email: string) {
  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: { emailVerified: new Date() },
    });
    return true;
  } catch (error) {
    return null;
  }
}
