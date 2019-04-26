/* eslint-disable import/named */
import express from 'express';
import transactionController from '../controllers/transaction-controller';
import authorize from '../middleware/userAuthorization';
import { transactionValidation, transIdValidation } from '../middleware/transactValidation';

const transactionRoute = express.Router();

transactionRoute.post('/:accountNumber/debit', transactionValidation, authorize.checkCashier, transactionController.debitAccount);
transactionRoute.post('/:accountNumber/credit', transactionValidation, authorize.checkCashier, transactionController.creditAccount);
transactionRoute.get('/:transactionId', transIdValidation, authorize.checkUser, transactionController.viewATransaction);


export default transactionRoute;
