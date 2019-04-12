import Transact from '../model/transaction.model';
import dummyAccount from '../utils/dummyAccount';


const transactionController = {
    debit(req, res) {
        const accountNumber = req.params.accountNumber;
        const amount = parseInt(req.body.amount);

        const registeredAccount = dummyAccount.find(anAccount => anAccount.accountNumber === parseInt(accountNumber, 10));
        

        if(!registeredAccount) {
            return res.status(403).json({
                status: res.statusCode,
                error: "Incorrect account number"
            });
        };
        if(registeredAccount.balance < amount) {
            console.log(registeredAccount.balance);
            return res.status(403).json({
                status: res.statusCode,
                error: "Insufficient balance"
            });
        };

                const transaction = Transact.debitAccount(registeredAccount, req);


        return res.status(200).json({
            status: res.statusCode,
            data: {
                transactionId: transaction.id,
                accountNumber: registeredAccount.accountNumber,
                amount: amount,
                cashier: req.user.id,
                transactionType: transaction.type,
                accountBalance: transaction.newBalance,
            }
        });

    },

    credit(req, res) {
        const accountNumber = req.params.accountNumber;
        const amount = parseInt(req.body.amount);

        const registeredAccount = dummyAccount.find(anAccount => anAccount.accountNumber === parseInt(accountNumber, 10));
        

        if(!registeredAccount) {
            return res.status(403).json({
                status: res.statusCode,
                error: "Incorrect account number"
            });
        };
        if(registeredAccount.balance < amount) {
            return res.status(403).json({
                status: res.statusCode,
                error: "Insufficient balance"
            });
        };

        const transaction = Transact.creditAccount(registeredAccount, req);


        return res.status(200).json({
            status: res.statusCode,
            data: {
                transactionId: transaction.id,
                accountNumber: registeredAccount.accountNumber,
                amount: amount,
                cashier: req.user.id,
                transactionType: transaction.type,
                accountBalance: transaction.newBalance,
            }
        });

    },
};

export default transactionController;