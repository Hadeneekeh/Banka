const queries = {
  users: {
    createUser: 'INSERT INTO users(firstName, lastName, email, hashpassword)VALUES($1, $2, $3, $4)RETURNING *',
    loginUser: 'SELECT * FROM users WHERE email = $1',
    findUser: 'SELECT * FROM users WHERE email=$1',
    createStaff: 'INSERT INTO users(firstName, lastName, email, hashpassword, type, isAdmin, registeredOn)VALUES($1, $2, $3, $4, $5, $6, $7)RETURNING *',
    findLoginUser: 'SELECT * FROM users JOIN accounts ON users.id = accounts.owner WHERE email=$1 AND accounts.owner=$2',
  },

  accounts: {
    createAccount: 'INSERT into accounts(accountNumber, createdOn, owner, type)VALUES($1, $2, $3, $4)RETURNING *',
    updateAccount: 'UPDATE accounts SET status=$1 WHERE accountNumber=$2 RETURNING *',
    getAnAccount: 'SELECT * FROM accounts WHERE accountNumber=$1',
    deleteAnAccount: 'DELETE FROM accounts WHERE accountNumber=$1 RETURNING *',
    updateAccountBal: 'UPDATE accounts SET balance=$1 WHERE accountNumber=$2',
    getAllAccounts: 'SELECT * FROM accounts',
    getAnAcctByEmail: `SELECT accounts.accountnumber, accounts.createdon, accounts.type, accounts.status, accounts.balance 
        FROM users JOIN accounts ON users.id = accounts.owner WHERE users.email=$1`,
    getDormantAcct: `SELECT accounts.createdon, accounts.accountnumber, users.email, accounts.type, accounts.status, accounts.balance 
        FROM users JOIN accounts ON users.id = accounts.owner WHERE accounts.status=$1`,
    findAnAccount: 'SELECT * FROM accounts JOIN users ON accounts.owner = users.id WHERE accountNumber=$1 AND users.id=$2',
    getAUserAcctByEmail: `SELECT accounts.accountnumber, accounts.createdon, accounts.type, accounts.status, accounts.balance 
        FROM users JOIN accounts ON users.id = accounts.owner WHERE users.email=$1 AND accounts.owner=$2`,
  },

  transactions: {
    createTransaction: 'INSERT INTO transactions(createdOn, type, accountNumber, cashier, amount, oldBalance, newBalance)VALUES($1, $2, $3, $4, $5, $6, $7)RETURNING *',
    getAtransaction: 'SELECT transactions.id, transactions.createdon, transactions.type, transactions.accountnumber, transactions.amount, transactions.oldbalance, transactions.newbalance FROM transactions JOIN accounts ON transactions.accountnumber = accounts.accountnumber WHERE transactions.id=$1 AND accounts.owner=$2',
    findAtransaction: 'SELECT transactions.id FROM transactions JOIN accounts ON transactions.accountnumber = accounts.accountnumber WHERE transactions.id=$1 AND accounts.owner=$2',
    getAllTransactions: 'SELECT transactions.id, transactions.createdon, transactions.cashier, transactions.type, transactions.accountnumber, transactions.amount, transactions.oldbalance, transactions.newbalance FROM transactions JOIN accounts ON transactions.accountnumber = accounts.accountnumber WHERE transactions.accountnumber=$1 AND accounts.owner=$2',
  },
};
export default queries;
