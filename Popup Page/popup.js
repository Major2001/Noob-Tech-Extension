import NoteManager from "../NoteManager/notemanager.js";

chrome.storage.sync.get("notes", (data) => {
  const notemanager = new NoteManager({
    el: document.querySelector(".pinned-notes"),
    notes: data.notes,
    page: "popup",
  });
  notemanager.renderNotes();
});
