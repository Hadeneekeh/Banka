/* eslint-disable no-useless-escape */
const api = 'https://banka-adc.herokuapp.com/api/v1/auth/signin';

const signin = document.getElementById('signin');
const msgContainer = document.getElementById('errorContainer');
const signinBtn = document.getElementById('signin-btn');

signin.addEventListener('submit', (event) => {
  event.preventDefault();

  signinBtn.value = 'loading...';

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        msgContainer.style.backgroundColor = 'white';
        msgContainer.style.color = 'black';
        msgContainer.innerHTML = 'Your Dashboard in a moment!';
        setTimeout(() => {
          if (response.data.type === 'admin') {
            window.location = './admin/manage-account.html';
          }
          if (response.data.type === 'user') {
            window.location = './client/client-dashboard.html';
          }
          if (response.data.type === 'cashier') {
            window.location = './cashier/debit-account.html';
          }
        }, 2000);

        localStorage.setItem('userInfo', JSON.stringify(response.data));
      }
      if (response.status === 400) {
        msgContainer.style.backgroundColor = 'white';
        msgContainer.style.color = 'red';
        msgContainer.style.padding = '1px';
        msgContainer.style.marginTop = '2px';
        msgContainer.innerHTML = response.error;
        signinBtn.value = 'Login';
      }
      setTimeout(() => {
        msgContainer.style.display = 'none';
      }, 5000);
    })
    .catch((error) => {
      msgContainer.style.backgroundColor = 'white';
      msgContainer.style.color = 'red';
      msgContainer.innerHTML = 'Unable to connect' || error.message;
      signinBtn.value = 'Login';
    });
});
