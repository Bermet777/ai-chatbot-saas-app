"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

interface CreateUserInput {
  fullname: string;
  clerkId: string;
  type: string;
  stripeId: string;
}

export async function createUserInDB({
  fullname,
  clerkId,
  type,
  stripeId,
}: CreateUserInput): Promise<User> {

  const safeFullname = fullname?.trim() || "New User"; //new code to save user full name 03/05
  try {
  const existingUser = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (existingUser) {
    return existingUser;
  }

  
  const newUser = await prisma.user.create({
    data: {
      fullname: safeFullname,
      clerkId,
      type,
      stripeId,
    },
  });

  //return newUser;
  console.log("New user created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error in createUserInDB:", error);
    throw error;
  }
}

