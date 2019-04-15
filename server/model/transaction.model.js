import dummyTransactions from '../utils/dummyTransaction'
import dummyAccount from '../utils/dummyAccount';

class Transaction {
    accountStatus(req, type) {
        const accountNumber = req.params.accountNumber;
        const amount = parseInt(req.body.amount);

        const registeredAccount = dummyAccount.find(anAccount => anAccount.accountNumber === parseInt(accountNumber, 10));
        

        if(!registeredAccount) {
            return "Incorrect account number";
        };

        if(registeredAccount.balance < amount) {
            return "Insufficient balance";
        };

        const transaction = {
            id: dummyTransactions.length + 1,
            createdOn: new Date(),
            type: type,
            accountNumber: parseInt(req.params.accountNumber, 10),
            cashier: req.user.id,
            amount: req.body.amount,
            oldBalance: registeredAccount.balance,
            newBalance: parseFloat((registeredAccount.balance) - parseFloat(req.body.amount)).toFixed(2),
        };

        registeredAccount.balance = transaction.newBalance;
        dummyTransactions.push(transaction);
        return transaction;
    }
}
const transactions = new Transaction;
export default transactions;