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
            return res.status(400).json({
                status: res.statusCode,
                error: error
            })
        }
    },

    async updateAccount(req, res) {

        try {
            const { rows } = await db.query(accountQuery.accounts.findAnAccount, [req.params.accountNumber]);

            
            if(!rows[0]) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: 'Account not found'
                });
            }

            const update = await db.query(accountQuery.accounts.updateAccount, [req.body.status, req.params.accountNumber]);
            
            return res.status(200).json({
                status: res.statusCode,
                data: [
                    {
                        accountNumber: update.rows[0].accountnumber,
                        status: update.rows[0].status
                    }
                ]
            });

        } catch (error) {            
            return res.status(404).json({
                status: res.statusCode,
                error: 'Check your input'
            });
        }
        
    },

    async deleteAccount(req, res) {
        try {
            const { rows } = await db.query(accountQuery.accounts.deleteAnAccount, [req.params.accountNumber]);

            if(!rows[0]) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: 'Account not found'
                });
            }

            return res.status(200).json({
                status: res.statusCode,
                message: 'Account successfully deleted'
            });
        } 
        catch (error) {
            return res.status(404).json({
                status: res.statusCode,
                error: 'Check your input'
            });
        }
    },

    async getAllAccounts(req, res) {
        try {
            const { rows } = await db.query(accountQuery.accounts.getAllAccounts);

            return res.status(200).json({
               status: res.statusCode,
               data: rows
            });

        } 
        catch (error) {
            return res.status(400).send(error);            
        }
    },

    async viewAnAccount(req, res) {
        try {
            const { rows } = await db.query(accountQuery.accounts.findAnAccount, [req.params.accountNumber]);


            return res.status(200).json({
                status: res.statusCode,
                data: [
                    {
                        createdOn: rows[0].createdon,
                        accountNumber: rows[0].accountnumber,
                        ownerEmail: req.user.rows[0].email,
                        type: rows[0].type,
                        status: rows[0].status,
                        balance: rows[0].balance
                    }
                ]
            })
        } catch (error) {
            return res.status(400).send(error);
        }
    }
}

export default accounts;