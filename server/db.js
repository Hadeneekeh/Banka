import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString = process.env.DATABASE_URL;
if (process.env.ENV_TEST) {
  connectionString = process.env.TEST_URL;
}

console.log(connectionString);
const pool = new Pool({
  connectionString,
});


pool.on('connect', () => {
  console.log(('Connected to the database'));
});


pool.on('remove', () => {
  console.log('Client removed');
});


export default pool;
