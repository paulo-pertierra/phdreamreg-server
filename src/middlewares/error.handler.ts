import { Prisma } from '@prisma/client';
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { ValidationErrors } from '../modules/registree/registree.validator';

const errorHandler: ErrorRequestHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ValidationErrors) {
    res.status(422).json({
      ...err.errors
    });
    return;
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(422).json({
      error: 'Validation on the client, emitted from the database.',
      ...err
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
  if (err instanceof TokenExpiredError) {
    res.status(401).json({
      error: {
        message: 'You are not authorized to access this API.'
      }
    });
    return;
  }
  res.status(500).json({
    error: {
      message: 'Fatal error: The system encountered an unhandled error.',
      err
    }
  });
  return;
};

export default errorHandler;