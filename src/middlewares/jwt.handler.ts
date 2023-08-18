import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwt.helper';

export class AuthenticationError extends Error {
  constructor(name: string, message: string) {
    super(name);
    this.name = name;
    this.message = message;
  }
}

export const validateAdminToken = async (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req.headers.authorization)
    .then(() => {
      next();
    })
    .catch((error) => {
      next(error);
    });
};
