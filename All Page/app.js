import NoteManager from "../NoteManager/notemanager.js";
// import Note from "./Note";

let date = "",
  time = "";
const getTime = async () => {
  const response = await (
    await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
  ).json();
  const res = response.datetime.split("T");
  date = res[0];
  time = res[1].split(".")[0];
};

chrome.storage.sync.get("notes", (data) => {
  console.log(data.notes);
  const notemanager = new NoteManager({
    el: document.querySelector(".mynotes"),
    notes: data.notes,
    page: "all-page",
  });
  const newnotebtn = document.querySelector(".newnote");
  newnotebtn.onclick = async () => {
    await getTime();
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
      console.log(newData.notes);
      console.log(notesArray);
      chrome.storage.sync.set({ notes: notesArray }, () => {
        console.log("Set");
      });
    });
  };

  var srchbar = document.querySelector(".searchin");

  srchbar.oninput = () => {
    console.log(srchbar.value);
    console.log(notemanager);
    notemanager.stopdisplay();
    var el = document.querySelector(".mynotes");
    var c = 0;
    for (var i = 0; i < notemanager.notes.length; i++) {
      if (
        notemanager.notes[i].body
          .toUpperCase()
          .indexOf(srchbar.value.toUpperCase()) > -1
      ) {
        c++;
        console.log(notemanager.notes[i].body.indexOf(srchbar.value));

        var noteel = notemanager.notes[i].getElement();
        el.appendChild(noteel);
      }
    }
    if (c === 0) {
      el.innerHTML = "<h2>...No notes found...</h2>";
    }
  };
});
