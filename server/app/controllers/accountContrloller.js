/* eslint-disable max-len */
import moment from 'moment';
import db from '../../db';
import accountQuery from '../migration/queries';

const accounts = {
  async createAccount(req, res) {
    const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    const values = [
      accountNumber,
      moment(new Date()),
      req.user.id,
      req.body.type,
    ];


    try {
      const { rows } = await db.query(accountQuery.accounts.createAccount, values);


      return res.status(201).json({
        status: 201,
        data: {
          accountNumber: rows[0].accountnumber,
          firstName: req.user.firstname,
          lastName: req.user.lastname,
          email: req.user.email,
          type: req.body.type,
          openingBalance: rows[0].balance,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: 'Internal error',
      });
    }
  },

  async updateAccount(req, res) {
    try {
      const { rows } = await db.query(accountQuery.accounts.getAnAccount, [req.params.accountNumber]);

      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Account not found',
        });
      }

      const update = await db.query(accountQuery.accounts.updateAccount, [req.body.status, req.params.accountNumber]);

      return res.status(200).json({
        status: res.statusCode,
        data: [
          {
            accountNumber: update.rows[0].accountnumber,
            status: update.rows[0].status,
          },
        ],
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: 'Internal error',
      });
    }
  },

  async deleteAccount(req, res) {
    try {
      const { rows } = await db.query(accountQuery.accounts.deleteAnAccount, [req.params.accountNumber]);

      if (!rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Account not found',
        });
      }

      return res.status(200).json({
        status: res.statusCode,
        message: 'Account successfully deleted',
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: 'Internal error',
      });
    }
  },

  async getAccount(req, res) {
    try {
      if (!req.query.status) {
        const { rows } = await db.query(accountQuery.accounts.getAllAccounts);
        return res.status(200).json({
          status: res.statusCode,
          data: rows,
        });
      }

      const { rows } = await db.query(accountQuery.accounts.getDormantAcct, [req.query.status]);
      if (!rows) {
        return res.status(404).json({
          ststus: res.statusCode,
          error: 'No Account found',
        });
      }

      return res.status(200).json({
        status: res.statusCode,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: 'Internal error',
      });
    }
  },

  async viewAnAccount(req, res) {
    try {
      const { rows } = await db.query(accountQuery.accounts.findAnAccount, [req.params.accountNumber, req.user.id]);
      if (!rows) {
        return res.status(404).json({
          ststus: res.statusCode,
          error: 'Account number can not be found',
        });
      }


      return res.status(200).json({
        status: res.statusCode,
        data: [
          {
            createdOn: rows[0].createdon,
            accountNumber: rows[0].accountnumber,
            ownerEmail: req.user.email,
            type: rows[0].type,
            status: rows[0].status,
            balance: rows[0].balance,
          },
        ],
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: 'Internal error',
      });
    }
  },

  async viewAcctByEmail(req, res) {
    try {
      const findEmail = await db.query(accountQuery.users.findUser, [req.params.userEmailAddress]);

      if (findEmail.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Email does not exist',
        });
      }

      const { rows } = await db.query(accountQuery.accounts.getAnAcctByEmail, [req.params.userEmailAddress]);

      return res.status(200).json({
        status: res.statusCode,
        accounts: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: 'Internal error',
      });
    }
  },

  async userViewAcctByEmail(req, res) {
    try {
      const findEmail = await db.query(accountQuery.users.findLoginUser, [req.query.email, req.user.id]);

      if (findEmail.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Email does not exist',
        });
      }

      const { rows } = await db.query(accountQuery.accounts.getAUserAcctByEmail, [req.query.email, req.user.id]);

      return res.status(200).json({
        status: res.statusCode,
        accounts: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: 'Internal error',
      });
    }
  },

  async viewTransactionHistory(req, res) {
    try {
      const result = await db.query(accountQuery.transactions.getAllTransactions, [req.params.accountNumber, req.user.id]);

      if (result.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'Transaction not found',
        });
      }

      return res.status(200).json({
        status: res.statusCode,
        data: result.rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: 'Internal error',
      });
    }
  },
};

export default accounts;
