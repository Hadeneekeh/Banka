import dummyTransactions from '../utils/dummyTransaction'

class Transaction {
    debitAccount(registeredAccount, req) {
        const transaction = {
            id: dummyTransactions.length + 1,
            createdOn: new Date(),
            type: 'debit',
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