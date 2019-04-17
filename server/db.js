import { Pool } from 'pg';
import dotenv from 'dotenv';

let connectionString;
dotenv.config();

if(process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_URL;
} else { 
  connectionString = process.env.DATABASE_URL;
}

const pool = new Pool({
  connectionString : connectionString,
});


pool.on('connect', () => {
  console.log((`Connected to the database`));
});


pool.on('remove', () => {
  console.log('Client removed');
});



export default pool;
