import Helper from '../auth/authController';

const users = [];

const dummyUser = {
        id: 1,
        firstName: 'Mat',
        lastName: 'Eniola',
        email: 'm.eny@banka.com',
        password: Helper.hashPassword('password'),
        type: 'staff',
        isAdmin: true,
        isCashier: false,
      };

function createUser({id, firstName, lastName, email,  type, isAdmin, isCashier}) {
        const user = {...dummyUser};
        user.id = id;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.type = type;
        user.isAdmin = isAdmin;
        user.isCashier = isCashier;

        return users.push(user);
    };

    const user1 = createUser({id: 1, firstName: 'Mat', lastName: 'Eniola', email: 'm.eny@banka.com',  type: 'staff', isAdmin: true, isCashier: false});
    const user2 = createUser({id: 2, firstName: 'Gbenro', lastName: 'Ade', email: 'g.ade@banka.com',  type: 'staff', isAdmin: false, isCashier: true});
    const user3 = createUser({id: 3, firstName: 'Fred', lastName: 'Amaka', email: 'f.amaka@example.com',  type: 'client', isAdmin: false, isCashier: false});


    export default users;