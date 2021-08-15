var firebaseConfig = {
  apiKey: "AIzaSyCUVezS4HduQ628WeiTxhTgJK7Y5VLdBuM",
  authDomain: "scrap-n-stick.firebaseapp.com",
  projectId: "scrap-n-stick",
  storageBucket: "scrap-n-stick.appspot.com",
  messagingSenderId: "994124947691",
  appId: "1:994124947691:web:277ef9322e1339b45a5eae",
  measurementId: "G-7SZRMD0C03",
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const dc = firestore.doc("notesDb/notesCollection");

export const getDataFirebase = async () => {
  const data = await dc.get();
  if (!data.data()) {
    return [];
  }
  return data.data().notes;
};

export const setDataFirebase = async (notesArray) => {
  const dc = firestore.collection("Notes");
  await dc.add;
};

chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  if (msg.command === "fetch") {
    console.log("data le raha");
    getDataFirebase().then((data) => resp(data));
  } else if (msg.command === "set") {
    console.log("data daal raha");
    setDataFirebase(msg.data).then(() => resp());
  }
  return true;
});
