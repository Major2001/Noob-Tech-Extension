var firebaseConfig = {
  apiKey: 'AIzaSyCUVezS4HduQ628WeiTxhTgJK7Y5VLdBuM',
  authDomain: 'scrap-n-stick.firebaseapp.com',
  projectId: 'scrap-n-stick',
  storageBucket: 'scrap-n-stick.appspot.com',
  messagingSenderId: '994124947691',
  appId: '1:994124947691:web:277ef9322e1339b45a5eae',
  measurementId: 'G-7SZRMD0C03',
};
// firestore initialization
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const notesRef = firestore.collection('notes');

// auth initilization
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const setDataFirebase = async (note) => {
  const newDoc = notesRef.doc();
  await newDoc.set({ ...note, id: newDoc.id });
  note.id = newDoc.id;
};

export const deleteDataFirebase = async (id) => {
  await notesRef.doc(id).delete();
};

const glogin = async () => {
  const result = await firebase.auth().signInWithPopup(provider);
  console.log(result);
};
export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const getDataFirebase = async () => {
  const currentUserId = getCurrentUser().uid;
  const querySnapshot = await notesRef.where('uid', '==', currentUserId).get();
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};
async function logout() {
  await firebase.auth().signOut();
}

const clearNotes = async () => {
  const currentUserId = getCurrentUser().uid;
  const query = notesRef.where('uid', '==', currentUserId);
  const querySnapshot = await query.get();
  querySnapshot.forEach(async function (doc) {
    await doc.ref.delete();
  });
};
chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  if (msg.command === 'fetch') {
    getDataFirebase().then((data) => resp(data));
  } else if (msg.command === 'set') {
    setDataFirebase(msg.data).then(() => resp());
  } else if (msg.command === 'delete') {
    console.log('Delete hora hai');
    deleteDataFirebase(msg.id).then(() => resp());
  } else if (msg.command == 'signin') {
    console.log('firebase tk pahuncha');
    glogin().then(() => resp());
  } else if (msg.command === 'getCurrentUser') {
    const user = getCurrentUser();
    resp(user);
  } else if (msg.command == 'logout') {
    console.log('logout firebase tk pahuncha');
    logout().then(() => resp());
  } else if (msg.command === 'clear') {
    clearNotes().then(() => resp());
  }
  return true;
});
