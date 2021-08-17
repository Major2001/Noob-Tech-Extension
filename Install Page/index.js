var firebaseConfig = {
  apiKey: 'AIzaSyCUVezS4HduQ628WeiTxhTgJK7Y5VLdBuM',
  authDomain: 'scrap-n-stick.firebaseapp.com',
  projectId: 'scrap-n-stick',
  storageBucket: 'scrap-n-stick.appspot.com',
  messagingSenderId: '994124947691',
  appId: '1:994124947691:web:277ef9322e1339b45a5eae',
  measurementId: 'G-7SZRMD0C03',
};
firebase.initializeApp(firebaseConfig);
document.getElementById('login_button').addEventListener('click',glogin);
document.getElementById('logout_button').addEventListener('click',logout);
var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});
function glogin(){
  console.log("login")
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
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
  firebase.auth().signOut().then((res)=>{
    console.log("logged out");
  })
}


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("signed in")
    document.getElementById('login_button').style.display="none";
    document.getElementById('logout_button').style.display="block";

    var uid = user.uid;
  } else {
    document.getElementById('login_button').style.display="block";
    document.getElementById('logout_button').style.display="none";
    console.log("signed out")
  }
});


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
