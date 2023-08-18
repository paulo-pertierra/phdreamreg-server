import { prisma } from "../../../prisma/client";

export const getAdmin = async (username: string) => {
  return await prisma.admin.findUnique({
    where: {
      username
    }
  })
}

class PleaseDontHackError extends Error {
  public message: string;
  constructor() {
    super()
    this.name = "ERR_ADMIN_CREATE_ATTEMPT"
    this.message = "Please don't hack us, we are just simple devs."
  }
}

export const createAdminOnce = async (username: string, password: string) => {
  const count = await prisma.admin.count();
  if (count !== 0) {
    throw new PleaseDontHackError();
  }
  const admin = await prisma.admin.create({
    data: {
      username,
      password
    }
  })
  return {
    uuid: admin.uuid,
    username: admin.username
  }
}