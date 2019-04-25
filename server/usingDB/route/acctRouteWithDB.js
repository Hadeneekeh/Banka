import express from 'express';
import dbAcctController from '../controllers/account-contrloller';
import authorize from '../middleware/userAuthorization';

import { accountValidation } from '../middleware/accountValidation';

const dbAcctRoute = express.Router();

dbAcctRoute.post('/accounts', accountValidation, authorize.checkUser, dbAcctController.createAccount);
dbAcctRoute.patch('/accounts/:accountNumber', authorize.checkAdmin, dbAcctController.updateAccount);
dbAcctRoute.delete('/accounts/:accountNumber', authorize.checkAdmin, dbAcctController.deleteAccount);
dbAcctRoute.get('/accounts', authorize.checkAdmin, dbAcctController.getAllAccounts);
dbAcctRoute.get('/accounts/:accountNumber', authorize.checkUser, dbAcctController.viewAnAccount);
dbAcctRoute.get('/user/:userEmailAddress/accounts', authorize.checkAdmin, dbAcctController.viewAcctByEmail);

export default dbAcctRoute;
