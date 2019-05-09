/* eslint-disable no-useless-escape */
const api = 'https://banka-adc.herokuapp.com/api/v1/auth/signup';

const signup = document.getElementById('signup');
const msgContainer = document.getElementById('errorContainer');
const signupBtn = document.getElementById('signup-btn');

signup.addEventListener('submit', (e) => {
  e.preventDefault();

  signupBtn.value = 'loading...';

  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        msgContainer.style.backgroundColor = 'white';
        msgContainer.style.color = 'black';
        msgContainer.innerHTML = 'Your Dashboard in a moment!';
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
        signupBtn.value = 'Sign Up';
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
