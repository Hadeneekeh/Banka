/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
const api = 'https://banka-adc.herokuapp.com/api/v1/accounts';

const createAccount = document.getElementById('createAcct');
const errMsgContainer = document.getElementById('errorContainer');
const createAccountBtn = document.getElementById('createAcct-btn');


const userDetails = JSON.parse(localStorage.getItem('userInfo'));
const userName = document.getElementById('username');
const userEmail = document.getElementById('useremail');

const getProfileDettails = () => {
  userName.innerText = `${userDetails.firstName}, ${userDetails.lastName}`;
  userEmail.innerText = userDetails.email;
};


const token = JSON.parse(localStorage.getItem('token'));

createAccount.addEventListener('submit', (event) => {
  event.preventDefault();

  createAccountBtn.value = 'loading...';

  const type = document.getElementById('accountType').value;


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
        errMsgContainer.style.backgroundColor = 'white';
        errMsgContainer.style.color = 'black';
        errMsgContainer.innerHTML = 'Loading...';
        setTimeout(() => {
          window.location = './client-dashboard.html';
        }, 2000);
      }
      if (response.status === 400) {
        errMsgContainer.style.backgroundColor = 'white';
        errMsgContainer.style.color = 'red';
        errMsgContainer.style.padding = '1px';
        errMsgContainer.style.marginTop = '2px';
        errMsgContainer.innerHTML = response.error;
        createAccountBtn.value = 'Create an Account';
      }
      setTimeout(() => {
        errMsgContainer.style.display = 'none';
      }, 5000);
    })
    .catch((error) => {
      errMsgContainer.style.backgroundColor = 'white';
      errMsgContainer.style.color = 'red';
      errMsgContainer.innerHTML = 'Unable to connect' || error.message;
    });
});


getProfileDettails();
