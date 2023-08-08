import { Request, Response, NextFunction } from "express";
import { query, validationResult } from "express-validator";
import { errorHandler } from "../error/error.handler";
export const createRegistreeValidator = [
  query("lastName").notEmpty().withMessage("Last name is required. If you don't have a last name, type N/A."),
  query("firstName").notEmpty().withMessage("First name is required."),
  query("contactEmail").notEmpty().withMessage("Email is required.").isEmail().withMessage("It should be a valid email address."),
  query("contactNumber").notEmpty().withMessage("Contact number is required.").matches(/^\+[0-9]{2} [0-9]{3} [0-9]{3} [0-9]{4}$/).withMessage("Contact number should be a valid PH number."),
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