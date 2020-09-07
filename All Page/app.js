import NoteManager from "../NoteManager/notemanager.js";

let date = "",
  time = "";
const getTime = () => {
  const date_time = new Date();
  let str = date_time.toString().split(" ");
  date = `${str[1]} ${str[2]} ${str[3]}`
  time = `${str[4]} ${str[5]}`
};

chrome.storage.sync.get("notes", (data) => {
  const notemanager = new NoteManager({
    el: document.querySelector(".mynotes"),
    notes: data.notes,
    page: "all-page",
  });
  const newnotebtn = document.querySelector(".newnote");
  newnotebtn.onclick = () => {
    getTime();
    notemanager.addnote({
      title: " Note added ",
      body: " (...click to add body...) ",
      time: time,
      date: date,
      url: "#",
      pinned: false,
    });
  };

  notemanager.onnotechange = (noteobj) => {
    chrome.storage.sync.get("notes", (newData) => {
      let idx = 0;
      idx = newData.notes.indexOf(
        newData.notes.find((note) => note.time === noteobj.time)
      );
      let notesArray = [...newData.notes];
      notesArray.splice(idx, 1);
      notesArray = [...notesArray, noteobj];
      chrome.storage.sync.set({ notes: notesArray });
    });
  };

  var srchbar = document.querySelector(".searchin");

  srchbar.oninput = () => {
    notemanager.stopdisplay();
    var el = document.querySelector(".mynotes");
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
      el.innerHTML = "<h2>...No notes found...</h2>";
    }
  };
});
