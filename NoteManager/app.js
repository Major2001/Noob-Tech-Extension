import NoteManager from "./notemanager.js";
// import Note from "./Note";
chrome.storage.sync.get("notes", (data) => {
  const notemanager = new NoteManager({
    el: document.querySelector(".mynotes"),
    notes: data.notes,
  });
  const newnotebtn = document.querySelector(".newnote");
  newnotebtn.onclick = () => {
    notemanager.addnote({
      title: " ",
      body: " ",
    });
  };
});
