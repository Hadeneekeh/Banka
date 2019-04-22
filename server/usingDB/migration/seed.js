import helper from '../auth/auth';
import pool from '../../db';
import moment from 'moment';

const hashPassword = helper.hashPassword('password');
const date = moment(new Date());

async function seed() {
    try {
        const createAdmin = await pool.query(
            `INSERT INTO users(firstName, lastName, email, hashpassword, type, isAdmin, registeredOn)VALUES('Kafilat', 'Adenike', 'hadeneekeh01@gmail.com', '${hashPassword}', 'admin', true, '${date}')`
        );

        const createUser = await pool.query(
            `INSERT INTO users(firstName, lastName, email, hashPassword, registeredOn)
            VALUES('Ade', 'Banke', 'ade.banke@example.com', '${hashPassword}', '${date}'),('Bimpe', 'Ridwan', 'bim.ridwan@example.com', '${hashPassword}', '${date}')`
        );

        const createCashier = await pool.query(
            `INSERT INTO users(firstName, lastName, email, hashpassword, type, isAdmin, registeredOn)VALUES('Ibrahim', 'Ayinde', 'cashier@gmail.com', '${hashPassword}', 'cashier', false, '${date}')`

        );

        const createAccount = await pool.query(
            `INSERT into accounts(accountNumber, createdOn, owner, type, balance)VALUES('2345987610', '${date}', '2', 'savings', '121456.89'),('9874561230', '${date}', '3', 'current', '745000')`
        );

        const createTransaction = await pool.query(
            `INSERT INTO transactions(createdOn, type, accountNumber, cashier, amount, oldBalance, newBalance)VALUES('${date}', 'credit', '2345987610', '4', '1000', '120456.98', '121456.98'),
            ('${date}', 'debit', '9874561230', '4', '5000', '750000', '745000')`
        );

    }

    catch(error) {
    console.log(error);
    }
}


seed();