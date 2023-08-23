import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { AuthenticationError } from '../middlewares/jwtverification.handler';
import dotenv from 'dotenv';
dotenv.config();

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'SECRET';

export const verifyToken = (authorizationHeader: string | undefined) => {
  return new Promise((resolve, reject) => {
    if (typeof authorizationHeader === 'undefined') {
      const error = new AuthenticationError('ERR_LOGGED_OUT', 'Error: User is not logged in.');
      reject(error);
      return;
    }
    const token = authorizationHeader.split(' ')[1];
    const credentials = jwt.verify(token, ADMIN_SECRET);
    if (credentials instanceof TokenExpiredError) {
      reject(credentials);
      return;
    }
    resolve(credentials);
    return;
  });
};

export const issueToken = (uuid: string) => {
  return jwt.sign({ uuid }, ADMIN_SECRET, { expiresIn: '12h' });
};
