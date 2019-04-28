/* eslint-disable no-unused-vars */
import pool from '../../db';


async function create() {
  try {
    const usersTable = await pool.query(`CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          hashpassword TEXT NOT NULL,
          type TEXT DEFAULT 'user',
          isAdmin BOOLEAN DEFAULT FALSE,
          registeredOn TIMESTAMP
          )`);

    const accountsTable = await pool.query(`CREATE TABLE IF NOT EXISTS accounts(
          id SERIAL PRIMARY KEY,
          accountNumber NUMERIC UNIQUE NOT NULL,
          createdOn TIMESTAMP,
          owner SERIAL NOT NULL,
          type TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'active',
          balance NUMERIC (100, 2) check (balance >= 0) DEFAULT 0.00,
          FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE
          )`);

    const transactionsTable = await pool.query(`CREATE TABLE IF NOT EXISTS transactions(
          id SERIAL PRIMARY KEY,
          createdOn TIMESTAMP NOT NULL,
          type TEXT NOT NULL,
          accountNumber NUMERIC REFERENCES accounts(accountNumber) on DELETE CASCADE,
          cashier INT REFERENCES users(id),
          amount NUMERIC NOT NULL,
          oldBalance NUMERIC (100, 2) NOT NULL,
          newBalance NUMERIC (100, 2) NOT NULL
          )`);
  } catch (error) {
    console.log(error);
  }
}

create();
