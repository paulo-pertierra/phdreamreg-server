import { Router } from 'express';
import * as registreeController from './registree.controller';
import { createRegistreeValidator } from './registree.validator';
import authnHandler from '../../middlewares/jwt.handler';

export const registreeRouter = Router();

registreeRouter.post('/', createRegistreeValidator, registreeController.createRegistree);
registreeRouter.put('/', authnHandler, (req, res) => {
  res.send("OK")
});
