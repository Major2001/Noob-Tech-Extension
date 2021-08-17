import { signin} from '../storage.js';

document.getElementById('login_button').addEventListener('click',async()=>{
  console.log("lol")
  await signin()});
document.getElementById('logout_button').addEventListener('click',logout);

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.uid);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function logout() {
  // firebase.auth().signOut().then((res)=>{
  //   console.log("logged out");
  // })
}


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
