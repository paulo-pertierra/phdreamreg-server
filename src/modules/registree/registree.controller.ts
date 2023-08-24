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

export const getRegistrees = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: registreeService.QueryParameters = {
      page: parseInt(req.query.page as string) || 1,
      orderBy: req.query.orderby as keyof Registree,
      order: req.query.order as 'asc' | 'desc' || 'desc',
      filterBy: req.query.filterby as keyof Registree,
      filter: req.query.filter as string,
      showSf: false
    }

    params.showSf = req.query.sfusers === 'true' ? true : false;

    const registrees = await registreeService.getRegistrees(params);
    const meta = await registreeService.getRegistreeStats(params, parseInt(req.query.page as string));
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
        ...registree
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUniqueRegistree = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await registreeService.updateRegistreeStatus(
      req.params.id as string,
      req.query.status as Status
    );
    res.json({
      message: `Successfully set the status to ${req.query.status}`
    });
    return;
  } catch (error) {
    next(error);
    return;
  }
};
