/* eslint-disable import/named */
import express from 'express';
import transactionController from '../controllers/transaction-controller';
import authorize from '../middleware/userAuthorization';
import { transactionValidation, transIdValidation } from '../middleware/transactValidation';
import { acctNumberValidation } from '../middleware/accountValidation';

const transactionRoute = express.Router();

transactionRoute.post('/:accountNumber/debit', acctNumberValidation, transactionValidation, authorize.verifyCashier, transactionController.debitAccount);
transactionRoute.post('/:accountNumber/credit', acctNumberValidation, transactionValidation, authorize.verifyCashier, transactionController.creditAccount);
transactionRoute.get('/:transactionId', transIdValidation, authorize.verifyUser, transactionController.viewATransaction);


export default transactionRoute;
