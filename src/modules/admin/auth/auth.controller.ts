import { Request, Response } from "express";
import * as authService from "./auth.service";

export const getAdmin = async (req: Request, res: Response) => {
  const admin = await authService.getAdmin(req.body.username);
  res.json({
    data: admin
  })
}

export const createAdminOnce = async (req: Request, res: Response) => {
  
}