import * as registreeService from './registree.service';
import { NextFunction, Request, Response } from 'express';
import { sendEmail } from '../../plugins/email.plugin';
import { Registree, Status } from '@prisma/client';

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

export const getRecentRegistrees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const registrees = await registreeService.getRecentRegistrees({
      page: parseInt(req.query.page as string),
      orderBy: req.query.orderby as keyof Registree,
      order: req.query.order = 'desc',
      filterBy: req.query.filterby as keyof Registree,
      filter: req.query.filter as string
    });
    const meta = await registreeService.getRegistreeStats(parseInt(req.query.page as string));
    res.json({
      data: registrees,
      meta
    });
    return;
  } catch (error) {
    next();
    return;
  }
};

export const getUniqueRegistree = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const registree = await registreeService.getUniqueRegistree(req.params.id as string);
    res.json({
      data: {
        registree
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUniqueRegistree = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const registree = registreeService.updateRegistreeStatus(
      req.params.id as string,
      req.query.status as Status
    );
    res.json({
      data: {
        registree
      }
    });
  } catch (error) {
    next(error);
    return;
  }
};
