import { Router } from 'express';
import { registreeRouter } from './registree/registree.route';

const apiRouter = Router();

apiRouter.use('/register', registreeRouter);

export default apiRouter;