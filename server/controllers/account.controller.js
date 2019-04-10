import accounts from '../model/account.model';


const AccountController = {
    createAccount(req, res) {
        

        const accountDetails = {...req.body};
        accounts.create(accountDetails, req);

        return res.status(201).json({
            status : res.statusCode ,
            data: {
            accountNumber : Math.floor(Math.random() * 9000000000) + 1000000000,
            firstName : req.user.firstName, // account owner first name
            lastName : req.user.lastName, // account owner last name
            email : req.user.email, // account owner email
            type : accountDetails.type,
            openingBalance: accountDetails.balance
            }
        });
    }
}

export default AccountController;