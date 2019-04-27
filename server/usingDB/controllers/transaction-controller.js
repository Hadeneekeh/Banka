/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable max-len */
import moment from 'moment';
import db from '../../db';
import transactionQuery from '../migration/queries';

const transactions = {
  async debitAccount(req, res) {
    try {
      const { accountNumber } = req.params;
      const amount = parseInt(req.body.amount);
      const { rows } = await db.query(transactionQuery.accounts.findAnAccount, [accountNumber]);

      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Account not found',
        });
      }

      const oldBalance = rows[0].balance;
      const newBalance = oldBalance - amount;
      const updateAcctountBal = await db.query(transactionQuery.accounts.updateAccountBal, [newBalance, rows[0].accountnumber]);


      const values = [
        moment(new Date()),
        'debit',
        accountNumber,
        req.user.id,
        amount,
        oldBalance,
        newBalance,
      ];
      const result = await db.query(transactionQuery.transactions.createTransaction, values);

      return res.status(201).json({
        status: res.statusCode,
        data: [
          {
            transactionId: result.rows[0].id,
            accountNumber: result.rows[0].accountnumber,
            amount: result.rows[0].amount,
            cashier: req.user.id,
            transactionType: result.rows[0].type,
            accountBalance: result.rows[0].newbalance,
          },
        ],
      });
    } catch (error) {
      if (error.code === '23514') {
        return res.status(400).json({
          status: res.statusCode,
          error: 'Insufficient Balance',
        });
      }
    }
  },

  async creditAccount(req, res) {
    try {
      const { accountNumber } = req.params;
      const amount = parseFloat(req.body.amount);
      const { rows } = await db.query(transactionQuery.accounts.findAnAccount, [accountNumber]);

      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Account not found',
        });
      }

      const oldBalance = rows[0].balance;
      const newBalance = parseFloat(oldBalance) + (parseFloat(amount));

      const updateAcctountBal = await db.query(transactionQuery.accounts.updateAccountBal, [newBalance, rows[0].accountnumber]);


      const values = [
        moment(new Date()),
        'credit',
        accountNumber,
        req.user.id,
        amount,
        oldBalance,
        newBalance,
      ];

      const result = await db.query(transactionQuery.transactions.createTransaction, values);

      return res.status(201).json({
        status: res.statusCode,
        data: [
          {
            transactionId: result.rows[0].id,
            accountNumber: result.rows[0].accountnumber,
            amount: result.rows[0].amount,
            cashier: req.user.id,
            transactionType: result.rows[0].type,
            accountBalance: result.rows[0].newbalance,
          },
        ],
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error,
      });
    }
  },

  async viewATransaction(req, res) {
    try {
      const result = await db.query(transactionQuery.transactions.findAtransaction, [req.params.transactionId]);

      if (result[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'The transaction ID does not exist',
        });
      }
      const { rows } = await db.query(transactionQuery.transactions.getAtransaction, [req.params.transactionId]);

      return res.status(200).json({
        status: res.statusCode,
        data: {
          transactionId: rows[0].id,
          createdOn: rows[0].createdon,
          type: rows[0].type,
          amount: rows[0].amount,
          oldBalance: rows[0].oldbalance,
          newBalance: rows[0].newbalance,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default transactions;
