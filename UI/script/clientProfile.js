const profileDetails = JSON.parse(localStorage.getItem('userInfo'));

const userName = document.getElementById('username');
const userEmail = document.getElementById('useremail');

const getProfileDettails = () => {
  userName.innerText = `${profileDetails.firstName}, ${profileDetails.lastName}`;
  userEmail.innerText = profileDetails.email;
};


getProfileDettails();
