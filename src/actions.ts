"use server";

import { PrismaClient } from "@prisma/client";

import { User } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByEmail(
  email: string | null
): Promise<User | null> {
  if (!email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
