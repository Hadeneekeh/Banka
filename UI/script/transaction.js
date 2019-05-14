// const token = JSON.parse(localStorage.getItem('token'));
// const msgContainer = document.getElementById('errorContainer');
const accountNumber = JSON.parse(localStorage.getItem('accountNumber'));
const tbody = document.getElementById('tbody');
const userName = document.getElementById('username');
const userEmail = document.getElementById('useremail');
const profileDetails = JSON.parse(localStorage.getItem('userInfo'));
const token = JSON.parse(localStorage.getItem('token'));
const msgContainer = document.getElementById('errorContainer');


const getProfileDettails = () => {
  userName.innerText = `${profileDetails.firstName}, ${profileDetails.lastName}`;
  userEmail.innerText = profileDetails.email;
};

const showTransactionHist = () => {
  fetch(`https://banka-adc.herokuapp.com/api/v1/accounts/${accountNumber}/transactions`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      let transactionList = '';
      if (response.status === 200) {
        response.data.forEach((transaction) => {
          transactionList += `
          <tr>
          <td>${transaction.id}</td>
          <td>${new Date(transaction.createdon).getDate()}/${new Date(transaction.createdon).getMonth() + 1}/${new Date(transaction.createdon).getFullYear()} ${new Date(transaction.createdon).getHours()}:${new Date(transaction.createdon).getMinutes()}</td>
          <td>${transaction.type}</td>
          <td>${transaction.accountnumber}</td>
          <td>${transaction.cashier}</td>
          <td>${transaction.amount}</td>
          <td>${transaction.oldbalance}</td>
          <td>${transaction.newbalance}</td>        
      </tr>
          `;
        });
        tbody.innerHTML += transactionList;
        msgContainer.innerHTML = '';
      }
      if (response.status === 404) {
        msgContainer.style.color = 'red';
        msgContainer.style.textAlign = 'justify';
        msgContainer.innerHTML += 'No transaction found';
      }
    })
    .catch((error) => {
      msgContainer.style.backgroundColor = 'white';
      msgContainer.style.color = 'red';
      msgContainer.innerHTML = error.message || 'Unable to connect';
    });
};


getProfileDettails();
showTransactionHist();
