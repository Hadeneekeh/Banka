import express from 'express';
import dbAcctController from '../controllers/account-contrloller';
import authorize from '../middleware/userAuthorization';

import { accountValidation } from '../middleware/accountValidation';

const dbAcctRoute = express.Router();

dbAcctRoute.post('/', accountValidation, authorize.checkUser, dbAcctController.createAccount);
dbAcctRoute.patch('/:accountNumber', authorize.checkAdmin, dbAcctController.updateAccount);
dbAcctRoute.delete('/:accountNumber', authorize.checkAdmin, dbAcctController.deleteAccount);
dbAcctRoute.get('/', authorize.checkAdmin, dbAcctController.getAllAccounts)

export default dbAcctRoute;