// Low Level controls direct to Prisma
import { prisma } from "../prisma/client";
import type { Registree } from "@prisma/client";

export const postRegistree = async (data: Omit<Registree, "uuid" | "updatedAt" | "createdAt">) => {
  await prisma.registree.create({
    data
  })
  return true;
}