 const newUserQuery = {
      users : {
        createUser:  'INSERT INTO users(firstName, lastName, email, hashpassword)VALUES($1, $2, $3, $4)RETURNING *',
        loginUser: 'SELECT * FROM users WHERE email = $1',
      },
      accounts: {

      },
  }
    export default newUserQuery;