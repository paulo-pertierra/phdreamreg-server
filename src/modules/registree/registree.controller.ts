import * as registreeService from "./registree.service";
import { NextFunction, Request, Response } from "express";

export const createRegistree  = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await registreeService.createRegistree(req.body);
    res.json({
      data: "Successfully uploaded."
    })
    return;
  } catch (error) {
    next(error);
  }
}