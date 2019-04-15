const accounts = [];

const dummyAccount = {
    id : 1 ,
    accountNumber : 1234567890,
    createdOn : new Date(),
    owner : 1 , // user id
    type : 'savings', // savings, current
    status : 'active', // draft, active, or dormant
    balance : 150000
};

function createAcct({id, accountNumber, owner, type, status, balance}) {
    const account = {...dummyAccount};
    account.id = id;
    account.accountNumber = accountNumber;
    account.createdOn = new Date();
    account.owner = owner;
    account.type =type;
    account.status = status;
    account.balance = balance;

    return accounts.push(account);
};

const account1 = createAcct({id:1, accountNumber: 8335248559, owner: 1, type : 'savings', status : 'active', balance : 150000});
const account2 = createAcct({id:2, accountNumber: 3372265130, owner: 2, type : 'current', status : 'dormat', balance : 100000});
const account3 = createAcct({id:3, accountNumber: 1389421984, owner: 3, type : 'savings', status : 'draft', balance : 90000});

export default accounts;