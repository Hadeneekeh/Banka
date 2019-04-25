import express from 'express';
import bodyParser from 'body-parser';


import userWithDb from './usingDB/route/userRouteWithDB';
import accountWithDB from './usingDB/route/acctRouteWithDB';
import transactionWithDB from './usingDB/route/transactRouteWithDB';


const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => res.send('Welcome to Banka'));


app.use('/api/v1/auth', userWithDb);
app.use('/api/v1', accountWithDB);
app.use('/api/v1/transactions', transactionWithDB);


app.use('*', (req, res) => {
    res.status(404).json({
        msg: 'Wrong URL!!! The page can not be found'
});
});

app.listen(port, () => console.log(`Server is running on PORT ${port}`));


export default app;