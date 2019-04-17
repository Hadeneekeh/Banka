import express from 'express';
import dbUserController from '../controllers/user-controller';

const dbUserRoute = express.Router();

dbUserRoute.post('/signup', dbUserController.signupUser);

export default dbUserRoute;