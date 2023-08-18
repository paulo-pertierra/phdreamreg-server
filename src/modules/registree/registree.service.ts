// Low Level controls direct to Prisma
import { prisma } from '../../prisma/client';
import type { Registree, Status } from '@prisma/client';

export const createRegistree = async (
  data: Omit<Registree, 'uuid' | 'updatedAt' | 'createdAt' | 'updatedAt'>
): Promise<Registree> => {
  return await prisma.registree.create({
    data
  });
};

export const updateRegistreeStatus = async (uuid: string, status: Status) => {
  return await prisma.registree.update({
    where: {
      uuid
    },
    data: {
      status
    }
  });
};

export const getRecentRegistrees = async () => {
  return await prisma.registree.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getUniqueRegistree = async (uuid: string) => {
  return await prisma.registree.findUnique({
    where: {
      uuid
    }
  });
};
