import * as registreeService from "./registree.service";
import { NextFunction, Request, Response } from "express";
import { sendEmail } from "../../plugins/email.plugin";


export const createRegistree  = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body)
    const registree = await registreeService.createRegistree(req.body);
    res.json({
      data: "Successfully uploaded."
    })
    await sendEmail(registree);
    return;
  } catch (error) {
    next(error);
  }
}