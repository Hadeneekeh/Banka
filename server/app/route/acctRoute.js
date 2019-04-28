import express from 'express';
import acctController from '../controllers/accountContrloller';
import authorize from '../middleware/userAuthorization';
import statusCheck from '../middleware/statusCheck';

import {
  accountTypeValidation, accountStatusValidation, acctNumberValidation, emailValidation,
} from '../middleware/accountValidation';

const acctRoute = express.Router();

acctRoute.post('/accounts', accountTypeValidation, authorize.verifyUser, acctController.createAccount);
acctRoute.patch('/accounts/:accountNumber', acctNumberValidation, accountStatusValidation, authorize.verifyAdmin, acctController.updateAccount);
acctRoute.delete('/accounts/:accountNumber', acctNumberValidation, authorize.verifyAdmin, acctController.deleteAccount);
acctRoute.get('/accounts', statusCheck, authorize.verifyAdmin, acctController.getAccount);
acctRoute.get('/accounts/:accountNumber', acctNumberValidation, authorize.verifyUser, acctController.viewAnAccount);
acctRoute.get('/user/:userEmailAddress/accounts', emailValidation, authorize.verifyAdmin, acctController.viewAcctByEmail);
acctRoute.get('/accounts/:accountNumber/transactions', acctNumberValidation, authorize.verifyUser, acctController.viewTransactionHistory);


export default acctRoute;
