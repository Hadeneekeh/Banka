import pool from '../../db';


  async function create() { 
      try {
        const usersTable = await pool.query(`CREATE TABLE IF NOT EXISTS users(
          id serial PRIMARY KEY,
          firstName text NOT NULL,
          lastName text NOT NULL,
          email text UNIQUE NOT NULL,
          hashpassword text NOT NULL,
          type text DEFAULT 'user',
          isAdmin BOOLEAN DEFAULT FALSE,
          registeredOn TIMESTAMP
          )`);

        const accountsTable = await pool.query(`CREATE TABLE IF NOT EXISTS accounts(
          id serial PRIMARY KEY,
          accountNumber numeric UNIQUE NOT NULL,
          createdOn TIMESTAMP,
          owner serial NOT NULL,
          type text NOT NULL,
          status text DEFAULT 'active',
          balance numeric (100, 2) DEFAULT 0.00,
          FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE
          )`);

        const transactionsTable = await pool.query(`CREATE TABLE IF NOT EXISTS transactions(
          id serial PRIMARY KEY,
          createdOn TIMESTAMP NOT NULL,
          type text NOT NULL,
          accountNumber numeric REFERENCES accounts(accountNumber) on DELETE CASCADE,
          cashier INT REFERENCES users(id),
          amount numeric NOT NULL,
          oldBalance numeric (100, 2) NOT NULL,
          newBalance numeric (100, 2) NOT NULL
          )`);
         
          console.log(transactionsTable);
          
      } catch (error) {
           console.log(error);
      }
  }

  create();