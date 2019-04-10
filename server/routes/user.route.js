import express from 'express';
import UserController from '../controllers/user.controller';

const userRoute = express.Router();

userRoute.post('/signup', UserController.register);
userRoute.post('/signin', UserController.signIn);

export default userRoute;