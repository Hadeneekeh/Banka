import {
  check, validationResult, oneOf,
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

// const queryValidation1 = [
//   query('status').not().isEmpty().withMessage('Account status can not be empty'),
//   oneOf([
//     query('status').equals('active'),
//     query('status').equals('dormant'),
//   ], 'Account query can only be \'Active\' or \'Dormant\''),

//   (req, res, next) => {
//     const errors = validationResult(req);
//     const errorMessages = [];

//     if (!errors.isEmpty()) {
//       errors.array().forEach((error) => {
//         errorMessages.push(error.msg);
//       });

//       return res.status(400).json({
//         status: 400,
//         error: errorMessages,
//       });
//     }

//     return next();
//   },
// ];

// const queryValidation2 = [
//   query('status').isEmpty(),

//   (req, res, next) => {
//     const errors = validationResult(req);
//     const errorMessages = [];

//     if (!errors.isEmpty()) {
//       errors.array().forEach((error) => {
//         errorMessages.push(error.msg);
//       });

//       return res.status(400).json({
//         status: 400,
//         error: errorMessages,
//       });
//     }

//     return next();
//   },
// ];

// const queryValidate = () => {
//   const isQuery = req.query.status;
//   const validation = isQuery ? queryValidation1 : queryValidation2;
//   return validation;
// };

export { accountTypeValidation, accountStatusValidation };
