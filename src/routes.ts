import { Router } from 'express';
import { registreeRouter } from './modules/registree/regsitree.route';

export const apiRouter = Router();

apiRouter.use('/register', registreeRouter);
