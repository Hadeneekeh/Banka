import { check, validationResult } from 'express-validator/check';

const transactionValidation = [

  check('amount').not().isEmpty().withMessage('Amount can not be empty')
    .isNumeric()
    .withMessage('The input is not valid'),
  check('amount').custom(async (value) => {
    if (Number(value) < 1) throw new Error('The amount is not valid');
  }),


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


export default transactionValidation;
