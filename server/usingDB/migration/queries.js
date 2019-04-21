 const queries = {
      users : {
        createUser:  'INSERT INTO users(firstName, lastName, email, hashpassword)VALUES($1, $2, $3, $4)RETURNING *',
        loginUser: 'SELECT * FROM users WHERE email = $1',
      },
      accounts: {
        createAccount: `INSERT into accounts(accountNumber, owner, type)VALUES($1, $2, $3)RETURNING *`,
        updateAccount: `UPDATE accounts SET status=$1 WHERE accountNumber=$2 RETURNING *`,
        findAnAccount: `SELECT * FROM accounts WHERE accountNumber=$1`
      },
  }
  export default queries;