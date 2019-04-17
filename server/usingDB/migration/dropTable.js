import pool from '../../db';

const dropUserTable = `DROP TABLE IF EXISTS users`;



  async function drop() { 
      try {
        const response = await pool.query(dropUserTable);
         console.log(response);
      } catch (error) {
           console.log(error);
      }
  }

  drop();