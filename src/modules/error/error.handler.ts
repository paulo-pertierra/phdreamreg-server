import { Request, Response, ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = async (err: Error, req: Request, res: Response) => {
  res.json(err)
}