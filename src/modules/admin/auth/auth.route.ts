import { Router } from 'express';
import * as authController from './auth.controller';

export const adminAuthRouter = Router();

adminAuthRouter.post('/login', authController.authenticateAdmin);
adminAuthRouter.post('/signup', authController.createAdminOnce);
