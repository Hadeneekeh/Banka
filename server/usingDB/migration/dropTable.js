import pool from '../../db';




  async function drop() { 
      try {
        const dropUserTable = await pool.query(`DROP TABLE IF EXISTS users CASCADE`);
        const dropAccountTable = await pool.query(`DROP TABLE IF EXISTS accounts CASCADE`);
      } 
      
      catch (error) {
           console.log(error);
      }
  }

  drop();