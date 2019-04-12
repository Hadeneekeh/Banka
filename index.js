import express from 'express';
import bodyParser from 'body-parser';

import userRoute from './server/routes/user.route';
import accountRoute from './server/routes/account.route';
import transactionRoute from './server/routes/transaction.route';


const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => res.send('Welcome to Banka'));
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/account', accountRoute);
app.use('/api/v1/transactions', transactionRoute);



app.listen(port, () => console.log(`Server is running on PORT ${port}`));


export default app;