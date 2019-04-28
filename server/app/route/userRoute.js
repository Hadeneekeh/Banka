import express from 'express';
import userController from '../controllers/userController';
import { signUpValidation, signInValidation, createStafValidation } from '../middleware/userValidation';
import authorize from '../middleware/userAuthorization';

const userRoute = express.Router();

userRoute.post('/signup', signUpValidation, userController.signupUser);
userRoute.post('/signin', signInValidation, userController.signinUser);
userRoute.post('/create', createStafValidation, authorize.verifyAdmin, userController.createStaff);

export default userRoute;
