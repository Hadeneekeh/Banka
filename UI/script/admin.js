/* eslint-disable no-unused-vars */
const profileDetails = JSON.parse(localStorage.getItem('userInfo'));
const userName = document.getElementById('username');
const userEmail = document.getElementById('useremail');
const token = JSON.parse(localStorage.getItem('token'));
// const searchAccount = document.getElementById('search');
const tableCont = document.getElementById('tableCont');
const getAccount = document.getElementById('getAccount');
const getAccountBtn = document.getElementById('getAccount-btn');
const tbody = document.getElementById('tbody');
const caption = document.getElementById('caption');
// const formCont = document.getElementById('acctProcess');


const getProfileDettails = () => {
  userName.innerText = `${profileDetails.firstName}, ${profileDetails.lastName}`;
  userEmail.innerText = profileDetails.email;
};


// searchResult.style.display = 'none';
tableCont.style.display = 'none';


getAccount.addEventListener('submit', (event) => {
  event.preventDefault();

  getAccountBtn.value = 'Processing...';

  tableCont.style.display = 'none';
  tbody.innerHTML = '';


  const status = document.getElementById('accountStatus').value;
  const capsStatus = status.toUpperCase();

  fetch(`https://banka-adc.herokuapp.com/api/v1/accounts?status=${status}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      let accountList = '';
      if (response.status === 200 && status === 'active') {
        caption.innerHTML = `ALL ${capsStatus} BANK ACCOUNTS`;
        tableCont.style.display = 'block';
        getAccountBtn.value = 'Get Accounts';


        response.data.forEach((account) => {
          accountList += `
            <tr>
            <td>${account.accountnumber}</td>
            <td>${account.firstname} ${account.lastname}</td>
            <td>${account.type}</td>
            <td>${account.status}</td>
            <td><button id="updateBtn" onclick="changeStatus(${account.accountnumber}, 'dormant')">Activate</button></td>
            <td><button id="deleteBtn" disabled style="background:grey; cursor:none; ">Delete</button></td>        
        </tr>
            `;
        });
        tbody.innerHTML += accountList;
      }

      if (response.status === 200 && status === 'dormant') {
        caption.innerHTML = `ALL ${capsStatus} BANK ACCOUNTS`;
        tableCont.style.display = 'block';
        getAccountBtn.value = 'Get Accounts';

        response.data.forEach((account) => {
          accountList += `
            <tr>
            <td>${account.accountnumber}</td>
            <td>${account.firstname} ${account.lastname}</td>
            <td>${account.type}</td>
            <td>${account.status}</td>
            <td><button id="updateBtn" onclick="changeStatus(${account.accountnumber}, 'active')">Activate</button></td>
            <td><button id="deleteBtn" onclick="deleteAccount(${account.accountnumber})">Delete</button></td>        
        </tr>
            `;
        });
        tbody.innerHTML += accountList;
      }

      if (response.status === 404) {
        tableCont.style.display = 'block';
        tableCont.innerHTML = response.error;
      }
    })
    .catch((error) => {
      tableCont.style.display = 'block';
      tableCont.style.backgroundColor = 'white';
      tableCont.style.color = 'red';
      tableCont.innerHTML = 'Unable to connect' || error.message;
    });
});


const deleteAccount = (accountNumber) => {
  fetch(`https://banka-adc.herokuapp.com/api/v1/accounts/${accountNumber}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 404) {
        tableCont.style.display = 'block';
        tableCont.style.backgroundColor = 'white';
        tableCont.style.color = 'red';
        tableCont.innerHTML = response.error;
      }
      if (response.status === 200) {
        tableCont.style.display = 'block';
        tableCont.innerHTML = `
        <h1 style="color:black; text-align:center">Account successfuly deleted</h1>
        <br>
        <botton class="closeBtn" onclick="reload()">Okay, refresh page</botton>`;
      }
    })
    .catch((error) => {
      tableCont.style.display = 'block';
      tableCont.style.backgroundColor = 'white';
      tableCont.style.color = 'red';
      tableCont.innerHTML = 'Unable to connect' || error.message;
    });
};


const changeStatus = (accountNumber, status) => {
  fetch(`https://banka-adc.herokuapp.com/api/v1/accounts/${accountNumber}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 404) {
        tableCont.style.display = 'block';
        tableCont.style.backgroundColor = 'white';
        tableCont.style.color = 'red';
        tableCont.innerHTML = response.error;
      }
      if (response.status === 200) {
        tableCont.style.display = 'block';
        tableCont.innerHTML = `
          <h1 style="color:black; text-align:center">Account status has been changed succesfully</h1>
          <br>
          <botton class="closeBtn" onclick="reload()">Okay, refresh page</botton>`;
      }
    })
    .catch((error) => {
      tableCont.style.display = 'block';
      tableCont.style.backgroundColor = 'white';
      tableCont.style.color = 'red';
      tableCont.innerHTML = 'Unable to connect' || error.message;
    });
};


const reload = () => {
  window.location.reload();
};
// searchAccount.addEventListener('click', (event) => {
//   event.preventDefault();

//   searchAccount.value = 'Processing...';

//   //   tableCont.style.display = 'none';
//   tbody.innerHTML = '';
//   formCont.style.display = 'none';


//   const email = document.getElementById('searchEmail').value;


//   fetch(`http://localhost:3000/api/v1/user/accounts?email=${email}`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(res => res.json())
//     .then((response) => {
//       let accountList = '';
//       if (response.status === 200) {
//         caption.innerHTML = 'SEARCH RESULT';
//         tableCont.style.display = 'block';
//         searchAccount.value = 'Search';


//         response.data.forEach((account) => {
//           accountList += `
//             <tr>
//             <td>${account.accountnumber}</td>
//             <td>${account.firstname} ${account.lastname}</td>
//             <td>${account.type}</td>
//             <td>${account.status}</td>
//             <td><button id="updateBtn">Deactivate</button></td>
//             <td><button id="deleteBtn">Delete</button></td>
//         </tr>
//             `;
//         });
//         tbody.innerHTML += accountList;
//       }
//     })
//     .catch((error) => {
//       tableCont.style.backgroundColor = 'white';
//       tableCont.style.color = 'red';
//       tableCont.innerHTML = 'Unable to connect' || error.message;
//     });
// });


getProfileDettails();
