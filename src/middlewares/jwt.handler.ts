import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'SECRET';

class AuthenticationError extends Error {
  constructor(name: string, message: string) {
    super(name);
    this.name = name;
    this.message = message;
  }
}

// export default async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (typeof req.headers.authorization === 'undefined')
//       throw new AuthenticationError("ERR_LOGGED_OUT", "Error: User is not logged in.")
//     const jwt = req.headers.authorization.split(' ')[1]
//   } catch (error) {
//     next(error);
//     return;
//   }
// }

export default async (req: Request, res: Response, next: NextFunction) => {
  const verify = new Promise((resolve, reject) => {
    if (typeof req.headers.authorization === 'undefined') {
      const error = new AuthenticationError('ERR_LOGGED_OUT', 'Error: User is not logged in.');
      reject(error);
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const credentials = jwt.verify(token, ADMIN_SECRET);
    if (credentials instanceof TokenExpiredError) {
      reject(credentials);
      return;
    }
    resolve(credentials);
    return;
  });
  await verify
    .then(() => {
      next();
    })
    .catch((error) => {
      next(error);
    });
};
