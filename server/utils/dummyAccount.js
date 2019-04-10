const accounts = [
    {
        id : 1 ,
        accountNumber : 8335248559,
        createdOn : new Date(),
        owner : 1 , // user id
        type : 'savings', // savings, current
        status : 'active', // draft, active, or dormant
        balance : 150000,
    },
    {
        id : 2,
        accountNumber : 3372265130,
        createdOn : new Date(),
        owner : 2, // user id
        type : 'current', // savings, current
        status : 'dormat', // draft, active, or dormant
        balance : 100000,
    },
    {
        id : 3,
        accountNumber : 1389421984,
        createdOn : new Date(),
        owner : 3, // user id
        type : 'savings', // savings, current
        status : 'draft', // draft, active, or dormant
        balance : 90000,
    },
    ]
    
    export default accounts;