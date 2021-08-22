import NoteManager from '../NoteManager/notemanager.js';
import { getData, setData, getCurrentUser,updateData } from '../storage.js';

const getDT = () => {
  const date_time = new Date();
  let str = date_time.toString().split(' ');
  let date = `${str[1]} ${str[2]} ${str[3]}`;
  let time = `${str[4]} ${str[5]}`;
  return { date, time };
};
var uid;
const initialize = async () => {
  const data = await getData();
  const notemanager = new NoteManager({
    el: document.querySelector('.mynotes'),
    notes: data,
    page: 'all-page',
  });
  const newnotebtn = document.querySelector('.newnote');
  const clearbtn = document.querySelector('.clear');
  newnotebtn.onclick = () => {
    const dt = getDT();
    notemanager.addnote({
      title: ' Note added ',
      body: ' (...click to add body...) ',
      time: dt.time,
      date: dt.date,
      url: '#',
      pinned: false,
      uid,
    });
  };
  clearbtn.onclick = () => {
    notemanager.clearNotes();
  };

  // notemanager.onnotechange = async (noteobj) => {
  //   let newData = await getData();
  //   let idx = 0;
  //   idx = newData.indexOf(newData.find((note) => note.time === noteobj.time));
  //   let notesArray = [...newData];
  //   notesArray.splice(idx, 1);
  //   notesArray = [...notesArray, noteobj];
  //   await setData(noteobj);
  // };

  var srchbar = document.querySelector('.searchin');

  srchbar.oninput = () => {
    notemanager.stopdisplay();
    var el = document.querySelector('.mynotes');
    var c = 0;
    for (var i = 0; i < notemanager.notes.length; i++) {
      if (
        notemanager.notes[i].body
          .toUpperCase()
          .indexOf(srchbar.value.toUpperCase()) > -1 ||
        notemanager.notes[i].title
          .toUpperCase()
          .indexOf(srchbar.value.toUpperCase()) > -1
      ) {
        c++;

        var noteel = notemanager.notes[i].getElement();
        el.appendChild(noteel);
      }
    }
    if (c === 0) {
      el.innerHTML = '<h2>...No notes found...</h2>';
    }
  };
};

window.onload = async () => {
  const user = await getCurrentUser();
  uid=user.uid
  if (!user) {
    chrome.tabs.create({ url: './Install Page/index.html' });
  }
  initialize();
};
