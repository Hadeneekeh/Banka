/* eslint-disable prefer-destructuring */
const profileDetails = JSON.parse(localStorage.getItem('userInfo'));
const token = JSON.parse(localStorage.getItem('token'));

const userName = document.getElementById('username');
const userEmail = document.getElementById('useremail');
const acctOverview = document.getElementById('acctOverview');
const msgContainer = document.getElementById('errorContainer');


const getProfileDettails = () => {
  userName.innerText = `${profileDetails.firstName}, ${profileDetails.lastName}`;
  userEmail.innerText = profileDetails.email;
};

const showAcctOverview = () => {
  const emailAddress = profileDetails.email;

  fetch(`https://banka-adc.herokuapp.com/api/v1/user/accounts?email=${emailAddress}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      let acctDisp = '';
      if (response.status === 200) {
        response.accounts.forEach((account) => {
          acctDisp += `
            <div class="acctDetails">
                        <h2>${account.accountnumber}</h2>
                        <p>Account Type</p>
                        <h4>${account.type}</h4>
                        <p>Account Status</p>
                        <h4>${account.status}</h4>
                        <p>Account Balance</p>
                        <h4>₦ ${account.balance}</h4>
                        <botton class="transBtn" onclick="getTransaction('${account.accountnumber}')">View Transaction</botton>
                    </div>`;
        });
        acctOverview.innerHTML = acctDisp;
      }
      if (response.status === 404) {
        acctOverview.innerHTML = '<h3>No Account found! Start by creating an account.</h3>';
      }
    })
    .catch((error) => {
      msgContainer.style.backgroundColor = 'white';
      msgContainer.style.color = 'red';
      msgContainer.innerHTML = 'Unable to connect' || error.message;
    });
};


// eslint-disable-next-line no-unused-vars
const getTransaction = (accountNumber) => {
  localStorage.setItem('accountNumber', accountNumber);
  window.location = './transaction.html';
};


getProfileDettails();
showAcctOverview();
