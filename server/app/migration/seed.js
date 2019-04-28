/* eslint-disable no-unused-vars */
import moment from 'moment';
import helper from '../auth/auth';
import pool from '../../db';

const hashPassword = helper.hashPassword('password');
const date = moment(new Date());

async function seed() {
  try {
    const createAdmin = await pool.query(
      `INSERT INTO users(firstName, lastName, email, hashpassword, type, isAdmin, registeredOn)VALUES
            ('Kafilat', 'Adenike', 'hadeneekeh01@gmail.com', '${hashPassword}', 'admin', true, '${date}')`,
    );

    const createUser = await pool.query(
      `INSERT INTO users(firstName, lastName, email, hashPassword, registeredOn)VALUES
            ('Ade', 'Banke', 'ade.banke@example.com', '${hashPassword}', '${date}'),
            ('Bimpe', 'Ridwan', 'bim.ridwan@example.com', '${hashPassword}', '${date}'),
            ('Yinka', 'Tofunmi', 'y.tofunmi@example.com', '${hashPassword}', '${date}')`,
    );

    const createCashier = await pool.query(
      `INSERT INTO users(firstName, lastName, email, hashpassword, type, isAdmin, registeredOn)
            VALUES('Ibrahim', 'Ayinde', 'cashier@gmail.com', '${hashPassword}', 'cashier', false, '${date}')`,

    );

    const createAccount = await pool.query(
      `INSERT into accounts(accountNumber, createdOn, owner, type, status, balance)VALUES
            ('2345987610', '${date}', '2', 'savings', 'active', '121456.89'),
            ('9874561230', '${date}', '3', 'current', 'dormant', '745000'),
            ('1289437654', '${date}', '3', 'savings', 'active', '43000'),
            ('1432978650', '${date}', '2', 'current', 'dormant', '520000')`,
    );

    const createTransaction = await pool.query(
      `INSERT INTO transactions(createdOn, type, accountNumber, cashier, amount, oldBalance, newBalance)VALUES
            ('${date}', 'credit', '2345987610', '5', '1000', '120456.98', '121456.98'),
            ('${date}', 'debit', '9874561230', '5', '5000', '750000', '745000'),
            ('${date}', 'debit', '1432978650', '5', '2000', '54000', '52000')`,
    );
  } catch (error) {
    console.log(error);
  }
}


seed();
