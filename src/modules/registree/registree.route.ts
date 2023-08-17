import { Request, Response, Router } from 'express';
import * as registreeController from './registree.controller';
import { createRegistreeValidator, updateRegistreeStatusValidator } from './registree.validator';
import authnHandler from '../../middlewares/jwt.handler';

export const registreeRouter = Router();

registreeRouter.post('/', createRegistreeValidator, registreeController.createRegistree);
registreeRouter.put('/', authnHandler, updateRegistreeStatusValidator, (req: Request, res: Response) => {
  res.send('OK');
});