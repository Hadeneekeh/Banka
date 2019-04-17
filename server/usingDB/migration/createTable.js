import pool from '../../db';

const usersTable = `CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    firstName text NOT NULL,
    lastName text NOT NULL,
    email text UNIQUE NOT NULL,
    hashpassword text NOT NULL,
    type text DEFAULT 'user',
    isAdmin BOOLEAN DEFAULT FALSE,
    registeredOn TIMESTAMP
    )`;


  async function create() { 
      try {
        const response = await pool.query(usersTable);
         console.log(response);
      } catch (error) {
           console.log(error);
      }
  }

  create();