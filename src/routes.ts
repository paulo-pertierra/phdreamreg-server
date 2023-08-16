import { Router } from 'express';
import { registreeRouter } from './modules/registree/registree.route';

export const apiRouter = Router();

apiRouter.use('/register', registreeRouter);
