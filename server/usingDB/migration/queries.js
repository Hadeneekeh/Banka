 const newUserQuery = {
      users : {
        createUser:  'INSERT INTO users(firstName, lastName, email, hashpassword)VALUES($1, $2, $3, $4)RETURNING *',
      },
      accounts: {

      },
  }
    export default newUserQuery;