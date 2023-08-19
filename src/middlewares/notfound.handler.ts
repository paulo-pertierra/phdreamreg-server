import { Request, Response } from 'express';

export default async (_req: Request, res: Response) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'The requested resource you were looking for was not found.'
    }
  });
};
