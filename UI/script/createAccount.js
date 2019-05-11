/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
const api = 'https://banka-adc.herokuapp.com/api/v1/accounts';

const createAccount = document.getElementById('createAcct');
const msgContainer = document.getElementById('errorContainer');
const createAccountBtn = document.getElementById('createAcct-btn');

createAccount.addEventListener('submit', (event) => {
  event.preventDefault();

  createAccountBtn.value = 'loading...';

  const type = document.getElementById('accountType').value;

  const userDetails = JSON.parse(localStorage.getItem('userInfo'));
  const token = userDetails.token;

  fetch(api, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        msgContainer.style.backgroundColor = 'white';
        msgContainer.style.color = 'black';
        msgContainer.innerHTML = 'Loading...';
        setTimeout(() => {
          window.location = './client-dashboard.html';
        }, 2000);

        localStorage.setItem('userInfo', JSON.stringify(response.data));
      }
      if (response.status === 400) {
        msgContainer.style.backgroundColor = 'white';
        msgContainer.style.color = 'red';
        msgContainer.style.padding = '1px';
        msgContainer.style.marginTop = '2px';
        msgContainer.innerHTML = response.error;
        createAccountBtn.value = 'Create an Account';
      }
      setTimeout(() => {
        msgContainer.style.display = 'none';
      }, 5000);
    })
    .catch((error) => {
      msgContainer.style.backgroundColor = 'white';
      msgContainer.style.color = 'red';
      msgContainer.innerHTML = 'Unable to connect' || error.message;
    });
});
