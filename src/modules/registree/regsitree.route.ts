import { Router } from 'express';
import * as registreeController from './registree.controller';
import { createRegistreeValidator } from './registree.validator';
import { errorHandler } from '../../middlewares/error.handler';

export const registreeRouter = Router();

registreeRouter.post(
  '/',
  createRegistreeValidator,
  registreeController.createRegistree,
  errorHandler
);
