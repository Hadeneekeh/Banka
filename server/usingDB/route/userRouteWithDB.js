import express from 'express';
import dbUserController from '../controllers/user-controller';
import { signUpValidation, signInValidation } from '../middleware/userValidation';

const dbUserRoute = express.Router();

dbUserRoute.post('/signup', signUpValidation, dbUserController.signupUser);
dbUserRoute.post('/signin', signInValidation, dbUserController.signinUser);

export default dbUserRoute;