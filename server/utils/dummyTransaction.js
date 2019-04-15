const transactions = [];

const dummyTransaction = {
    id: 1,
    createdOn: new Date(),
    type: 'credit',
    accountNumber: 8335248559,
    cashier: 1,
    amount: 9500.00,
    oldBalance: 1230.67,
    newBalance: 10730.67,
};

function createTransaction({id, type, accountNumber, cashier,  amount, oldBalance, newBalance}) {
    const transaction = {...dummyTransaction};
    transaction.id = id;
    transaction.createdOn = new Date();
    transaction.type = type;
    transaction.accountNumber = accountNumber;
    transaction.cashier = cashier;
    transaction.amount = amount;
    transaction.oldBalance = oldBalance;
    transaction.newBalance = newBalance;

    return transactions.push(transaction);
};

const transaction1 = createTransaction({id:1, type: 'credit', accountNumber: 8335248559, cashier: 1, amount: 9500.00, oldBalance: 1230.67, newBalance: 10730.67});
const transaction2 = createTransaction({id:1, type: 'debit', accountNumber: 8335248559, cashier: 2, amount: 19750.00, oldBalance: 1000.01, newBalance: 20750.01});


export default transactions;