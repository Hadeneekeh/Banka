import helper from '../auth/auth';
import db from '../../db';
import { STATUS_CODES } from 'http';

const User = {
    async signupUser(req, res) {
        //const newUser = {...req.body};

        const hashPassword = helper.hashPassword(req.body.password);

        const createUserQuery = `INSERT INTO users(firstName, lastName, email, hashpassword)
        VALUES($1, $2, $3, $4)
        RETURNING id, firstname, lastname, email, type, isadmin, registeredon`;

        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hashPassword
        ];

        try {
            const { rows } = await db.query(createUserQuery, values);
            const token = await helper.generateToken({id: rows[0].id, email: rows[0].email, isAdmin: rows[0].isadmin, type: rows[0].type})
            return res.status(201).json(
            {
                status: res.statusCode,
                data: {
                    token,
                    id: rows[0].id,
                    firstName: rows[0].firstname,
                    lastName: rows[0].lastname,
                    email: rows[0].email
                }
            })
        } catch (error) {
            if(error.routine === '_bt_check_unique') {
                return res.status(400).json({
                    status: 400,
                    error: 'Email already exist'
                });
            } 
            return res.status(400).send(error);
        }
    },
}


export default User;