import { Prisma } from '@prisma/client';
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { Result } from 'express-validator';


export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof Result) {
    res.status(422).json({
      status: 422,
      ...err
    });
    return;
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(422).json({
      error: 'Validation on the client, emitted from the database.'
    });
    return;
  }
  if (err instanceof Prisma.PrismaClientInitializationError) {
    res.status(500).json({
      error: {
        code: err.errorCode,
        message: err.message
      }
    });
    return;
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(409).json({
      error: {
        message:
          'Record already exists. Please try again with different details, or email us at support.'
      }
    });
    return;
  }
  res.status(500).json({
    error: {
      message: 'Fatal error: The system is down.'
    }
  });
  return;
};
