import express from 'express';
import dbAcctController from '../controllers/account-contrloller';
import authorize from '../middleware/userAuthorization';

import { accountValidation } from '../middleware/accountValidation';

const dbAcctRoute = express.Router();

dbAcctRoute.post('/', accountValidation, authorize.checkUser, dbAcctController.createAccount);

export default dbAcctRoute;