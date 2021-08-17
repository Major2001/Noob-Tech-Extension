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
const firestore = firebase.firestore();
const dc = firestore.collection('notes');

export const getDataFirebase = async () => {
  const querySnapshot = await dc.get();
  console.log('hello');
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const setDataFirebase = async (note) => {
  const newDoc = firestore.collection('notes').doc();
  await newDoc.set({ ...note, id: newDoc.id });
  note.id = newDoc.id;
};

export const deleteDataFirebase = async (id) => {
  console.log(id);
  await firestore.collection('notes').doc(id).delete();
};

chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  if (msg.command === 'fetch') {
    console.log('data le raha');
    getDataFirebase().then((data) => resp(data));
  } else if (msg.command === 'set') {
    console.log('data daal raha');
    setDataFirebase(msg.data).then(() => resp());
  } else if (msg.command === 'delete') {
    console.log("Delete hora hai");
    deleteDataFirebase(msg.id).then(() => resp());
  }
  else if(msg.command=='signin'){
    console.log("firebase tk pahuncha")
    glogin().then(()=>resp());
  }
  return true;
});


var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

async function glogin(){
  console.log("login")
  console.log('sign in hoga')
    const result=await firebase.auth().signInWithPopup(provider);
    console.log(result)
}

function logout() {
  firebase.auth().signOut().then((res)=>{
    console.log("logged out");
  })
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
