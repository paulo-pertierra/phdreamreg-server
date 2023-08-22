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

export const getRecentRegistrees = async (params: QueryParameters = undefined) => {
  if (params) {
    const { page = 1, pageSize = DEFAULT_PAGE_SIZE, orderBy = 'createdAt', filterBy = 'null', filter } = params;
    let order = params.order;
    if (orderBy === 'lastName' || orderBy === 'firstName' || orderBy === 'company') {
      order = order === 'desc' ? "asc" : "desc";
    }
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

export const getRegistreeStats = async (page: number) => {
  const total = await prisma.registree.count({ where: { deleted: false } })

  const meta = {
    stats: {
      totalCount: total,
      pendingCount: await prisma.registree.count({ where: { deleted: false, status: 'PENDING' } }),
      paidCount: await prisma.registree.count({ where: { deleted: false, status: 'PAID' } }),
      attendedCount: await prisma.registree.count({ where: { deleted: false, status: 'ATTENDED' } }),
      salesforceUsers: await prisma.registree.count({ where: { deleted: false, salesforceUser: true } })
    },
    meta: {
      pagination: {
        page,
        pageCount: Math.ceil(total / DEFAULT_PAGE_SIZE),
        total
      }
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
