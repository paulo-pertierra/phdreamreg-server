import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { errorHandler } from "../error/error.handler";
export const createRegistreeValidator = [
  check("lastName").optional(),
  check("firstName").notEmpty().withMessage("First name is required."),
  check("contactEmail").notEmpty().withMessage("Email is required.").bail().isEmail().withMessage("It should be a valid email address."),
  check("contactNumber").notEmpty().withMessage("Contact number is required.").bail().matches(/^\+[0-9]{2} [0-9]{3} [0-9]{3} [0-9]{4}$/).withMessage("Contact number should be a valid PH number."),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errorHandler(errors, req, res, next)
      return;
    }
    next();
    return;
  }
]