import { NextFunction, Request, Response } from 'express';
import * as authService from './auth.service';

export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admin = await authService.authenticateAdmin(req.body.username, req.body.password);
    res.json({
      data: admin
    });
  } catch (error) {
    next(error);
  }
};

export const createAdminOnce = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admin = await authService.createAdminOnce(req.body.username, req.body.password);
    res.json({
      username: admin.username,
      password: admin.password
    });
  } catch (error) {
    next(error);
  }
};
