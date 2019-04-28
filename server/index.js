import express from 'express';
import bodyParser from 'body-parser';


import userRoute from './app/route/userRoute';
import accountRoute from './app/route/acctRoute';
import transactionRoute from './app/route/transactRoute';


const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => res.send('Welcome to Banka'));


app.use('/api/v1/auth', userRoute);
app.use('/api/v1', accountRoute);
app.use('/api/v1/transactions', transactionRoute);


app.use('*', (req, res) => {
  res.status(404).json({
    status: res.statusCode,
    errorr: 'Wrong URL!!! The page can not be found',
  });
});

app.listen(port, () => console.log(`Server is running on PORT ${port}`));


export default app;
