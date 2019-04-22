import express from 'express';
import transactionController from '../controllers/transaction-controller';
import authorize from '../middleware/userAuthorization';
import { transactionValidation } from '../middleware/transactValidation'

const transactionRoute = express.Router();

transactionRoute.post('/:accountNumber/debit', transactionValidation, authorize.checkCashier, transactionController.debitAccount);

export default transactionRoute;