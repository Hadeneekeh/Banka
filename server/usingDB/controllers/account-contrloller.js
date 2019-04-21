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
    },

    async updateAccount(req, res) {
        const { status } = req.body;
        const { accountNumber } = req.params;

// console.log(req.params);
// console.log(req.body);


        try {
            const { rows } = await db.query(accountQuery.accounts.findAnAccount, [req.params.accountNumber]);

//console.log(rows[0]);
            
            if(!rows[0]) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: 'Account not found'
                });
            }

            const update = await db.query(accountQuery.accounts.updateAccount, [req.body.status, req.params.accountNumber]);
            //console.log(update);
            
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
            console.log(error);
            
            return res.status(404).json({
                status: res.statusCode,
                error: 'Check your input'
            });
        }
        
    },
}

export default accounts;