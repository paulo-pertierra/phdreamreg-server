// Low Level controls direct to Prisma
import { prisma } from "../../prisma/client";
import type { Registree } from "@prisma/client";

export async function createRegistree(data: Omit<Registree, "uuid" | "updatedAt" | "createdAt">): Promise<Registree> {
  return await prisma.registree.create({
    data
  })
}