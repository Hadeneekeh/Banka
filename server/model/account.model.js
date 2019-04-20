// import accounts from '../utils/dummyAccount';

// const Account = {
//     create(accountDetails, req) {
//         const newAccount = {
//             id : accounts.length + 1,
//             accountNumber : Math.floor(Math.random() * 9000000000) + 1000000000,
//             createdOn : new Date(),
//             owner : req.user.id, // user id
//             type : accountDetails.type, // savings, current
//             status : 'draft', // draft, active, or dormant
//             balance : parseFloat(accountDetails.balance),
//         };

//         accounts.push(newAccount);
        
//         return newAccount;
//     }
// }

// export default Account;