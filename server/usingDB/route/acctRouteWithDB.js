import express from 'express';
import dbAcctController from '../controllers/account-contrloller';
import authorize from '../middleware/userAuthorization';
import statusCheck from '../middleware/statusCheck';

import {
  accountTypeValidation, accountStatusValidation, acctNumberValidation, emailValidation,
} from '../middleware/accountValidation';

const dbAcctRoute = express.Router();

dbAcctRoute.post('/accounts', accountTypeValidation, authorize.verifyUser, dbAcctController.createAccount);
dbAcctRoute.patch('/accounts/:accountNumber', acctNumberValidation, accountStatusValidation, authorize.verifyAdmin, dbAcctController.updateAccount);
dbAcctRoute.delete('/accounts/:accountNumber', acctNumberValidation, authorize.verifyAdmin, dbAcctController.deleteAccount);
dbAcctRoute.get('/accounts', statusCheck, authorize.verifyAdmin, dbAcctController.getAccount);
dbAcctRoute.get('/accounts/:accountNumber', acctNumberValidation, authorize.verifyUser, dbAcctController.viewAnAccount);
dbAcctRoute.get('/user/:userEmailAddress/accounts', emailValidation, authorize.verifyAdmin, dbAcctController.viewAcctByEmail);
dbAcctRoute.get('/accounts/:accountNumber/transactions', acctNumberValidation, authorize.verifyUser, dbAcctController.viewTransactionHistory);


export default dbAcctRoute;
