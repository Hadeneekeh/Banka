import {
  check, validationResult, oneOf, param,
} from 'express-validator/check';

const accountTypeValidation = [

  check('type').not().isEmpty().withMessage('Account type can not be empty'),
  oneOf([
    check('type').equals('savings'),
    check('type').equals('current'),
  ], 'Account type can only be \'Savings\' or \'Current\''),

  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = [];

    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMessages.push(error.msg);
      });

      return res.status(400).json({
        status: 400,
        error: errorMessages,
      });
    }

    return next();
  },
];

const accountStatusValidation = [
  check('status').not().isEmpty().withMessage('Account status can not be empty'),
  oneOf([
    check('status').equals('active'),
    check('status').equals('dormant'),
  ], 'Account type can only be \'Active\' or \'Dormant\''),

  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = [];

    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        errorMessages.push(error.msg);
      });

      return res.status(400).json({
        status: 400,
        error: errorMessages,
      });
    }

    return next();
  },
];

const emailValidation = [
  param('userEmailAddress').not().isEmpty().withMessage('Email Address can not be empty')
    .isEmail()
    .withMessage('Input a valid email address'),
];

const acctNumberValidation = [
  param('accountNumber').not().isEmpty().withMessage('Account Number can not be empty')
    .isNumeric()
    .withMessage('Account Number must be a number')
    .isLength({ min: 10, max: 10 })
    .withMessage('Account Number must be \'10\' digit'),
];


export {
  accountTypeValidation, accountStatusValidation, acctNumberValidation, emailValidation,
};
