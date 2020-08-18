import Note from "./Note.js";
export default class NoteManager {
  constructor({ el, notes }) {
    this.el = el;
    this.notes = notes.map((note) => new Note(note, this));
    this.onnotechange = (noteobj) => {};
    this.onnoteadd = (noteobj) => {};
    this.renderNotes();
  }
  compare(a, b) {
    if (a.body.length >= b.body.length) {
      return 1;
    } else {
      return -1;
    }
  }
  renderNotes() {
    this.el.innerHTML = "";
    this.notes.sort(this.compare);
    this.notes.forEach((note) => this.rendernote(note.getElement()));
  }
  rendernote(noteel) {
    this.el.appendChild(noteel);
  }

  removenote(note) {
    this.notes.splice(this.notes.indexOf(note), 1);
    chrome.storage.sync.set(
      {
        notes: this.notes,
      },
      () => {
        const notif = {
          type: "basic",
          iconUrl: "tick.png",
          title: "Stick It!",
          message: "You note has been successfully deleted!",
        };
        chrome.notifications.create("deleteNote", notif);
        this.renderNotes();
      }
    );
  }

  addnote(note) {
    const noteobj = new Note(note, this);
    this.notes.push(noteobj);
    this.onnoteadd(noteobj);
    this.renderNotes();
  }
}
