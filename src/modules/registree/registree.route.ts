import { Router } from 'express';
import * as registreeController from './registree.controller';
import { createRegistreeValidator } from './registree.validator';

export const registreeRouter = Router();

registreeRouter.post('/', createRegistreeValidator, registreeController.createRegistree);
