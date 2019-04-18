import express from 'express';
import dbUserController from '../controllers/user-controller';

const dbUserRoute = express.Router();

dbUserRoute.post('/signup', dbUserController.signupUser);
dbUserRoute.post('/signin', dbUserController.signinUser);

export default dbUserRoute;