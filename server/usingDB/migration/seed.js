import helper from '../auth/auth';
import pool from '../../db';

const hashPassword = helper.hashPassword('password');
async function seed() {
    try {
        const createAdmin = await pool.query(
            `INSERT INTO users(firstName, lastName, email, hashpassword, isAdmin)VALUES('Kafilat', 'Adenike', 'hadeneekeh01@gmail.com', '${hashPassword}', true)`
        );

        const createUser = await pool.query(
            `INSERT INTO users(firstName, lastName, email, hashPassword)
            VALUES('Ade', 'Banke', 'ade.banke@example.com', '${hashPassword}'),('Bimpe', 'Ridwan', 'bim.ridwan@example.com', '${hashPassword}')`
        );

        const createAccount = await pool.query(
            `INSERT into accounts(accountNumber, owner, type, balance)VALUES('2345987610', '2', 'savings', '120456.89')`
        )
    }

    catch(error) {
    console.log(error);
    }
}


seed();