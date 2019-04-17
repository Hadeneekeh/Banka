import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});


pool.on('connect', () => {
  console.log((`Connected to the database`));
});


pool.on('remove', () => {
  console.log('Client removed');
});



export default pool;
