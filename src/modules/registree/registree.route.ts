import { Router } from 'express';
import * as registreeController from './registree.controller';
import { createRegistreeValidator, updateRegistreeStatusValidator } from './registree.validator';
import { validateAdminToken } from '../../middlewares/jwt.handler';

export const registreeRouter = Router();

registreeRouter.get('/:id', validateAdminToken, registreeController.getUniqueRegistree);
registreeRouter.get('/', validateAdminToken, registreeController.getRecentRegistrees);
registreeRouter.post('/', createRegistreeValidator, registreeController.createRegistree);
registreeRouter.put(
  '/:id',
  validateAdminToken,
  updateRegistreeStatusValidator,
  registreeController.updateUniqueRegistree
);
