const profileDetails = JSON.parse(localStorage.getItem('userInfo'));
const userName = document.getElementById('username');
const userEmail = document.getElementById('useremail');
const token = JSON.parse(localStorage.getItem('token'));
const msgContainer = document.getElementById('msgContainer');
const debit = document.getElementById('debit');
const debitBtn = document.getElementById('debit-btn');


const getProfileDettails = () => {
  userName.innerText = `${profileDetails.firstName}, ${profileDetails.lastName}`;
  userEmail.innerText = profileDetails.email;
};
msgContainer.style.display = 'none';


debit.addEventListener('submit', (event) => {
  event.preventDefault();

  debitBtn.value = 'Processing...';

  const amount = document.getElementById('amount').value;
  const accountNumber = document.getElementById('acctNumber').value;


  fetch(`https://banka-adc.herokuapp.com/api/v1/transactions/${accountNumber}/debit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        const transaction = `
                  <h2>Successful! See receipt below:</h2>
                  <h4 class="transH">Transaction ID</h4>
                  <p class="transP">${response.data[0].transactionId}</p>
                  <h4 class="transH">Account Number</h4>
                  <p class="transP">${response.data[0].accountNumber}</p>
                  <h4 class="transH">Transaction Value</h4>
                  <p class="transP">${response.data[0].amount}</p>
                  <h4 class="transH">Transaction Type</h4>
                  <p class="transP">${response.data[0].transactionType}</p>
                  <br>
                  <botton class="closeBtn" onclick="transactionCompleted()">Okay</botton>
              `;
        msgContainer.style.display = 'block';
        msgContainer.innerHTML = transaction;
        debitBtn.value = 'Debit';
      }
      if (response.status === 404) {
        msgContainer.style.display = 'block';

        msgContainer.innerHTML = `${response.error}
                  <br>
                  <botton class="closeBtn" onclick="transactionCompleted()">Okay</botton>
                  `;
        debitBtn.value = 'Debit';
      }
      if (response.status === 403) {
        msgContainer.style.display = 'block';
        msgContainer.innerHTML = `${response.error}
                  <br>
                  <botton class="closeBtn" onclick="transactionCompleted()">Okay</botton>
                  `;
        debitBtn.value = 'Debit';
      }
      if (response.status === 400) {
        msgContainer.style.display = 'block';
        msgContainer.innerHTML = `${response.error}`;
        debitBtn.value = 'Debit';
        setTimeout(() => {
          msgContainer.style.display = 'none';
        }, 4000);
      }
    })
    .catch((error) => {
      msgContainer.style.display = 'block';
      msgContainer.style.backgroundColor = 'white';
      msgContainer.style.color = 'red';
      msgContainer.innerHTML = error.message || 'Unable to connect';
      debitBtn.value = 'Debit';
      setTimeout(() => {
        msgContainer.style.display = 'none';
      }, 5000);
    });
});

// eslint-disable-next-line no-unused-vars
const transactionCompleted = () => {
  msgContainer.style.display = 'none';
  window.location.reload();
};

getProfileDettails();
