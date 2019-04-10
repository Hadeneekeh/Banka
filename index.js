import express from 'express';
import bodyParser from 'body-parser';

import userRoute from './server/routes/user.route';

const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => res.send('Server setup is fine'));
app.use('/v1/auth', userRoute);


app.listen(port, () => console.log(`Server is running on PORT ${port}`));


export default app;