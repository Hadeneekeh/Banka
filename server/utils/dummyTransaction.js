const transactions = [
    {
        id: 1,
        createdOn: new Date(),
        type: 'credit',
        accountNumber: 8335248559,
        cashier: 1,
        amount: 9500.00,
        oldBalance: 1230.67,
        newBalance: 10730.67,
    },
    {
        id: 2,
        createdOn: new Date(),
        type: 'debit',
        accountNumber: 8335248559,
        cashier: 2,
        amount: 19750.00,
        oldBalance: 1000.01,
        newBalance: 20750.01,
    },
]

export default transactions;