import express from 'express';
import dbUserController from '../controllers/user-controller';
import { signUpValidation, signInValidation, createStafValidation } from '../middleware/userValidation';
import authorize from '../middleware/userAuthorization';

const dbUserRoute = express.Router();

dbUserRoute.post('/signup', signUpValidation, dbUserController.signupUser);
dbUserRoute.post('/signin', signInValidation, dbUserController.signinUser);
dbUserRoute.post('/create', authorize.checkAdmin, createStafValidation, dbUserController.createStaff);

export default dbUserRoute;