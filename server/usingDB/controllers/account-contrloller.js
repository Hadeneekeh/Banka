import db from '../../db';
import accountQuery from '../migration/queries';

const accounts = {
    async createAccount(req, res){       
        const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
        
        const values = [
            accountNumber,
            req.user.rows[0].id,
            req.body.type
        ];


        try {
            const { rows } = await db.query(accountQuery.accounts.createAccount, values);           
            return res.status(201).json({
                status: 201,
                data: {
                    accountNumber: rows[0].accountnumber,
                    firstName: req.user.rows[0].firstName,
                    lastName: req.user.rows[0].lastName,
                    email: req.user.rows[0].email,
                    type: req.body.type,
                    openingBalance: rows[0].balance
                }
            })
        } 
        
        catch (error) {
            console.log(error);
            
            return res.status(400).json({
                status: res.statusCode,
                error: error
            })
        }
    }
}

export default accounts;