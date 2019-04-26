import express from 'express';
import dbAcctController from '../controllers/account-contrloller';
import authorize from '../middleware/userAuthorization';
import statusCheck from '../middleware/statusCheck';

import { accountTypeValidation, accountStatusValidation } from '../middleware/accountValidation';

const dbAcctRoute = express.Router();

dbAcctRoute.post('/accounts', accountTypeValidation, authorize.checkUser, dbAcctController.createAccount);
dbAcctRoute.patch('/accounts/:accountNumber', accountStatusValidation, authorize.checkAdmin, dbAcctController.updateAccount);
dbAcctRoute.delete('/accounts/:accountNumber', authorize.checkAdmin, dbAcctController.deleteAccount);
dbAcctRoute.get('/accounts', statusCheck, authorize.checkAdmin, dbAcctController.getAccount);
dbAcctRoute.get('/accounts/:accountNumber', authorize.checkUser, dbAcctController.viewAnAccount);
dbAcctRoute.get('/user/:userEmailAddress/accounts', authorize.checkAdmin, dbAcctController.viewAcctByEmail);


export default dbAcctRoute;
