import * as registreeService from './registree.service';
import { NextFunction, Request, Response } from 'express';
import { sendEmail } from '../../plugins/email.plugin';

export const createRegistree = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const registree = await registreeService.createRegistree(req.body);
    res.json({
      data: {
        uuid: registree.uuid,
        message: 'Successfully registered.'
      }
    });
    await sendEmail(registree);
    return;
  } catch (error) {
    next(error);
    return;
  }
};
