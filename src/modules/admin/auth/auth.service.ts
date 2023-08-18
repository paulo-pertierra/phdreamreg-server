import { prisma } from "../../../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { issueToken } from "../../../helpers/jwt.helper";

export class PleaseDontHackError extends Error {
  public message: string;
  constructor(name: string) {
    super()
    this.name = name;
    this.message = "Please don't hack us, we are just simple devs."
  }
}

export const authenticateAdmin = async (username: string, password: string) => {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin || !await bcrypt.compare(password, admin.password)) {
    throw new PleaseDontHackError("ERR_ADMIN_LOGIN_ATTEMPT");
  }
  const token = issueToken(admin.uuid);
  return {
    username: admin.username,
    token
  }
}

export const createAdminOnce = async (username: string, password: string) => {
  const count = await prisma.admin.count();
  if (count !== 0) {
    throw new PleaseDontHackError("ERR_ADMIN_CREATE_ATTEMPT");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.create({
    data: {
      username,
      password: hashedPassword
    }
  });
  return admin
}