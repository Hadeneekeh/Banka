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
         
          console.log(accountsTable);
          
      } catch (error) {
           console.log(error);
      }
  }

  create();