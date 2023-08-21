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
    where: {
      deleted: false
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getRegistreeStats = async () => {
  const stats = {
    totalCount: 0,
    pendingCount: 0,
    paidCount: 0,
    attendedCount: 0,
    salesforceUsers: 0
  }
  stats.totalCount = await prisma.registree.count();
  stats.pendingCount = await prisma.registree.count({ where: { status: 'PENDING' } });
  stats.paidCount = await prisma.registree.count({ where: { status: 'PAID' } });
  stats.attendedCount = await prisma.registree.count({ where: { status: 'ATTENDED' } });
  stats.salesforceUsers = await prisma.registree.count({ where: { salesforceUser: true } });
  
  return stats;
}

export const getUniqueRegistree = async (uuid: string) => {
  return await prisma.registree.findUnique({
    where: {
      uuid
    }
  });
};
