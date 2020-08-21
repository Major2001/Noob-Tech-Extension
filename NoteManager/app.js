import NoteManager from "./notemanager.js";
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
});
