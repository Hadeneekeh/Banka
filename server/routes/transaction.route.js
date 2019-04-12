import express from 'express';
import TransactionController from '../controllers/transaction.controller';
import authorize from '../middleware/userValidator';

const transactionRoute = express.Router();

transactionRoute.post('/:accountNumber/debit', authorize.checkCashier, TransactionController.debit);

export default transactionRoute;