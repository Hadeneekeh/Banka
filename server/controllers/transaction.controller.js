import Transact from '../model/transaction.model';


const transactionController = {
    debit(req, res) {
        const transaction = Transact.accountStatus(req, 'debit');


        if(transaction === "Incorrect account number") {
            return res.status(400).json({
                status: res.statusCode,
                error: "Incorrect account number"
            });
        };
        if(transaction === "Insufficient balance") {
            return res.status(400).json({
                status: res.statusCode,
                error: "Insufficient balance"
            });
        };


        return res.status(200).json({
            status: res.statusCode,
            data: {
                transactionId: transaction.id,
                accountNumber: req.params.accountNumber,
                amount: req.body.amount,
                cashier: req.user.id,
                transactionType: transaction.type,
                accountBalance: transaction.newBalance,
            }
        });

    },

    credit(req, res) {
        
        const transaction = Transact.accountStatus(req, 'credit');

        if(transaction === "Incorrect account number") {
            return res.status(400).json({
                status: res.statusCode,
                error: "Incorrect account number"
            });
        };
        
        return res.status(200).json({
            status: res.statusCode,
            data: {
                transactionId: transaction.id,
                accountNumber: req.params.accountNumber,
                amount: req.body.amount,
                cashier: req.user.id,
                transactionType: transaction.type,
                accountBalance: transaction.newBalance,
            }
        });

    },
};

export default transactionController;