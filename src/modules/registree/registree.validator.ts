import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export class ValidationErrors extends Error {
  public errors;
  constructor(errors: Array<object>) {
    super();
    this.name = 'Validation Error';
    this.message = 'There are errors in user input';
    this.errors = errors;
  }
}

export const createRegistreeValidator = [
  check('lastName').notEmpty().withMessage('Last name is required.'),
  check('firstName').notEmpty().withMessage('First name is required.'),
  check('contactEmail')
    .notEmpty()
    .withMessage('Email is required.')
    .bail()
    .isEmail()
    .withMessage('It should be a valid email address.'),
  check('contactNumber')
    .notEmpty()
    .withMessage('Contact number is required.')
    .bail()
    .matches(/^\+[0-9]{2} [0-9]{3} [0-9]{3} [0-9]{4}$/)
    .withMessage('Contact number should be a valid PH number.'),
  check('company').optional(),
  check('salesforceUser').isBoolean().optional(),
  check('salesforceUserRole').optional(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new ValidationErrors(errors as unknown as Array<object>));
      return;
    }
    next();
    return;
  }
];

export const updateRegistreeStatusValidator = [
  check('id')
    .notEmpty()
    .withMessage('UUID Field should not be empty.')
    .bail()
    .isUUID('4')
    .withMessage('UUID Field should be a valid UUIDv4'),
  check('status')
    .notEmpty()
    .withMessage('Status field should not be empty.')
    .bail()
    .custom((status: string) => {
      const validStatuses = ['PENDING', 'PAID', 'ATTENDED'];
      let isValid = false;
      validStatuses.map((validStatus) => {
        if (validStatus === status) isValid = true;
      });
      if (!isValid) {
        return Promise.reject('Status field should only contain [ PENDING | PAID | ATTENDED ].');
      }
      return true;
    }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new ValidationErrors(errors as unknown as Array<object>));
      return;
    }
    next();
    return;
  }
];
