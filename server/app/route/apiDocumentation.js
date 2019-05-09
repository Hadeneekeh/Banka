import express from 'express';
import apiDoc from '../controllers/apiDocController';

const docRoute = express.Router();

docRoute.get('/', apiDoc.apiDoc);

export default docRoute;
