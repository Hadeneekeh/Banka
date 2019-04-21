import { check, validationResult } from 'express-validator/check';

const accountValidation = [
    
        check('type').not().isEmpty().withMessage('Account type can not be empty').isAlpha().isLength({ min: 7 }),
        


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


    export { accountValidation };