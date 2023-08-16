import { Prisma } from '@prisma/client';
import { Request, Response, ErrorRequestHandler } from 'express';
import { Result } from 'express-validator';

export const errorHandler: ErrorRequestHandler = async (
  err: Error,
  req: Request,
  res: Response
) => {
  if (err instanceof Result) {
    console.log('Yep, validation error.');
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    console.log('Yep, Prisma Client Validation Error');
  }
  res.status(422).json(err);
};
