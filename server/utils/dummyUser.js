import Helper from '../auth/authController';

const users = [
    {
      id: 1,
      firstName: 'Mat',
      lastName: 'Eniola',
      email: 'm.eny@banka.com',
      password: Helper.hashPassword('password'),
      type: 'staff',
      isAdmin: 'true',
    },
    {
      id: 2,
      firstName: 'Gbenro',
      lastName: 'Ade',
      email: 'g.ade@banka.com',
      password: Helper.hashPassword('password'),
      type: 'staff',
      isAdmin: 'false',
    },
    {
      id: 3,
     
      firstName: 'Fred',
      lastName: 'Amaka',
      email: 'f.amaka@example.com',
      password: Helper.hashPassword('password'),
      type: 'client',
      isAdmin: 'false',
    },
  ]

  export default users;