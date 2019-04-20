import express from 'express';
import bodyParser from 'body-parser';



//import userRoute from './routes/user.route';
//import accountRoute from './routes/account.route';
//import transactionRoute from './routes/transaction.route';

import userWithDb from './usingDB/route/userRouteWithDB';
import accountWithDB from './usingDB/route/acctRouteWithDB'


const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => res.send('Welcome to Banka'));
//app.use('/api/v1/auth', userRoute);
//app.use('/api/v1/accounts', accountRoute);
//app.use('/api/v1/transactions', transactionRoute);

app.use('/api/v1/auth', userWithDb);
app.use('/api/v1/accounts', accountWithDB);



app.listen(port, () => console.log(`Server is running on PORT ${port}`));


export default app;