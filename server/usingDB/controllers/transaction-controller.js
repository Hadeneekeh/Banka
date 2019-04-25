import db from '../../db';
import transactionQuery from '../migration/queries';
import moment from 'moment';

const transactions = {
    async debitAccount(req, res) {
        try {
            const accountNumber = req.params.accountNumber;
            const amount = parseInt(req.body.amount);
            const { rows } = await db.query(transactionQuery.accounts.findAnAccount, [accountNumber]);    
            const oldBalance = rows[0].balance;
            const newBalance = oldBalance - amount;
            const updateAcctountBal = await db.query(transactionQuery.accounts.updateAccountBal, [newBalance, rows[0].accountnumber]);

            if(!rows[0]) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: 'Account not found'
                });
            }
    
            const values = [
                moment(new Date()),
                'debit',
                accountNumber,
                req.user.rows[0].id,
                amount,
                oldBalance,
                newBalance
            ];
            const result = await db.query(transactionQuery.transactions.createTransaction, values);   

            return res.status(201).json({
                status: res.statusCode,
                data: [
                    {
                      transactionId: result.rows[0].id,
                      accountNumber: result.rows[0].accountnumber,
                      amount: result.rows[0].amount,
                      cashier: req.user.rows[0].id,
                      transactionType: result.rows[0].type,
                      accountBalance: result.rows[0].newbalance
                    } 
                ]
            });
        } 
        catch (error) {
            if(error.code === '23514') {
                return res.status(400).json({
                    status: res.statusCode,
                    error: 'Insufficient Balance'
                });
            }   
        }
    },

    async creditAccount(req, res) {
        try {
            const accountNumber = req.params.accountNumber;
            const amount = parseFloat(req.body.amount);   
            const { rows } = await db.query(transactionQuery.accounts.findAnAccount, [accountNumber]);    
            const oldBalance = rows[0].balance;
            const newBalance = parseFloat(oldBalance) + (parseFloat(amount));
    
            const updateAcctountBal = await db.query(transactionQuery.accounts.updateAccountBal, [newBalance, rows[0].accountnumber]);

            if(!rows[0]) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: 'Account not found'
                });
            }
        
            const values = [
                moment(new Date()),
                'credit',
                accountNumber,
                req.user.rows[0].id,
                amount,
                oldBalance,
                newBalance
            ];

            const result = await db.query(transactionQuery.transactions.createTransaction, values);
    
            return res.status(201).json({
                status: res.statusCode,
                data: [
                    {
                      transactionId: result.rows[0].id,
                      accountNumber: result.rows[0].accountnumber,
                      amount: result.rows[0].amount,
                      cashier: req.user.rows[0].id,
                      transactionType: result.rows[0].type,
                      accountBalance: result.rows[0].newbalance
                    }
                ]
            });
        }        
        catch (error) {
            return res.status(400).json({
                status: res.statusCode,
                error: error
            });
        }
    }
}

export default transactions;