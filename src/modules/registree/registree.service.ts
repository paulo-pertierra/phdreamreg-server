// Low Level controls direct to Prisma
import { prisma } from '../../prisma/client';
import type { Registree, Status } from '@prisma/client';

const DEFAULT_PAGE_SIZE = 15;

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

type QueryParameters = {
  page?: number
  pageSize?: number
  orderBy?: keyof Registree
  order?: 'desc' | 'asc'
  filterBy?: keyof Registree
  filter?: string
} | undefined

export const getRegistrees = async (params: QueryParameters = undefined) => {
  if (params) {
    const { page = 1, pageSize = DEFAULT_PAGE_SIZE, orderBy = 'createdAt', order, filterBy = 'null', filter } = params;
    return await prisma.registree.findMany({
      skip: pageSize * (page - 1),
      take: pageSize,
      where: {
        deleted: false,
        [filterBy]: filter
      },
      orderBy: {
        [orderBy]: order
      },
    });
  } else {
    return await prisma.registree.findMany({
      where: { deleted: false },
      orderBy: { createdAt: 'desc' }
    })
  }
};

export const getRegistreeStats = async (total: number, page: number = 1) => {
  const totalCount = await prisma.registree.count({ where: { deleted: false } });
  const meta = {
    stats: {
      totalCount,
      pendingCount: await prisma.registree.count({ where: { deleted: false, status: 'PENDING' } }),
      paidCount: await prisma.registree.count({ where: { deleted: false, status: 'PAID' } }),
      attendedCount: await prisma.registree.count({ where: { deleted: false, status: 'ATTENDED' } }),
      salesforceUsers: await prisma.registree.count({ where: { deleted: false, salesforceUser: true } })
    },
    pagination: {
      page,
      pageCount: Math.ceil(totalCount / DEFAULT_PAGE_SIZE),
      pageSize: DEFAULT_PAGE_SIZE,
      total
    }
  }




  return meta;
}

export const getUniqueRegistree = async (uuid: string) => {
  return await prisma.registree.findUnique({
    where: {
      uuid
    }
  });
};
