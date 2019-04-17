import pool from '../../db';

const usersTable = `CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL,
    hashpassword text NOT NULL,
    type text NOT NULL,
    isadmin text NOT NULL
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