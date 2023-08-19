import { Router } from 'express';
import { registreeRouter } from './registree/registree.route';
import { adminAuthRouter } from './admin/auth/auth.route';

const apiRouter = Router();

apiRouter.use('/register', registreeRouter);
apiRouter.use('/admin/auth', adminAuthRouter);

export default apiRouter;
