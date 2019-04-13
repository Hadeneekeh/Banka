import accounts from '../model/account.model';
import dummyAccount from '../utils/dummyAccount';


const AccountController = {
    createAccount(req, res) {
        

        const accountDetails = {...req.body};
        accounts.create(accountDetails, req);

        return res.status(200).json({
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
    },

    updateAccountStatus(req, res) {
        const { status } = req.body;
        const { accountNumber } = req.params;

        const validAccount = dummyAccount.find(anAccount => anAccount.accountNumber === parseInt(accountNumber, 10));

        if(validAccount) {
            return res.status(200).json({
                status: res.statusCode,
                data: {
                    accountNumber: accountNumber, 
                    status: status,
                }
            });
        };

    },

    deleteAccount(req, res) {
        const { accountNumber } = req.params;

        const accountIndex = dummyAccount.findIndex(anAccount => anAccount.accountNumber === parseInt(accountNumber, 10))
        
        dummyAccount.splice(accountIndex, 1)
        
        return res.status(200).json({
            status: res.statusCode,
            message: 'Account deleted successfully'
        });
    }
}

export default AccountController;