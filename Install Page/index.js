import { signin, getCurrentUser, logout } from '../storage.js';

document.getElementById('login_button').addEventListener('click', async () => {
  console.log('lol');
  await signin();
  location.reload();
});
document.getElementById('logout_button').addEventListener('click', async () => {
  console.log('logout');
  await logout();
  location.reload();
});

window.onload = async () => {
  const user = await getCurrentUser();
  if (user) {
    console.log('signed in');
    document.getElementById('login_button').style.display = 'none';
    document.getElementById('logout_button').style.display = 'block';
  } else {
    document.getElementById('login_button').style.display = 'block';
    document.getElementById('logout_button').style.display = 'none';
    console.log('signed out');
  }
};

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log("signed in")
//     document.getElementById('login_button').style.display="none";
//     document.getElementById('logout_button').style.display="block";

//     var uid = user.uid;
//   } else {
//     document.getElementById('login_button').style.display="block";
//     document.getElementById('logout_button').style.display="none";
//     console.log("signed out")
//   }
// });

// const makeId = (userEmail) => {
//   return (
//     String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
//     Date.now() +
//     btoa(userEmail)
//   );
// };
// window.onload = () => {
//   const form = document.getElementById('signup-form');
//   form.onsubmit = (e) => {
//     e.preventDefault();
//     const userName = e.target.user_name.value;
//     const userEmail = e.target.user_email.value;
//     const userId = makeId(userEmail);
//     localStorage.setItem('user', JSON.stringify({ userName, userId }));
//   };
// };
