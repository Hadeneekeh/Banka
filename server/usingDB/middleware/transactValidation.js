import { check, validationResult } from 'express-validator/check';

const transactionValidation = [
    
        check('amount').not().isEmpty().withMessage('Amount can not be empty').isInt().withMessage('amount can only be number'),
        


        (req, res, next) => {
            const errors = validationResult(req);
            const errorMessages = [];

            if(!errors.isEmpty()) {
                errors.array().forEach(error => {
                    errorMessages.push(error.msg)
                });

                return res.status(400).json({
                    status: 400,
                    error: errorMessages
                });
            }

            return next();
        },
    ];


    export { transactionValidation };