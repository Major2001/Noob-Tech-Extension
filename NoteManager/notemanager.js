import Note from "../NoteManager/Note.js";
export default class NoteManager {
  constructor({ el, notes, page }) {
    this.el = el;
    this.page = page;
    this.notes = notes.map((note) => new Note(note, this, page));
    this.onnotechange = (noteobj) => {};
    this.renderNotes();
  }
  compare(a, b) {
    if (a.body.length >= b.body.length) {
      return 1;
    } else {
      return -1;
    }
  }
  renderNotes(event = "normal-render") {
    this.el.innerHTML = "";
    if (event === "normal-render") {
      this.notes.sort(this.compare);
    }
    if (this.page == "all-page") {
      this.notes.forEach((note) => this.rendernote(note.getElement()));
    } else {
      let pinnedNotes = [];
      this.notes.forEach((note) => {
        if (note.pinned) {
          pinnedNotes.push(note);
        }
      });
      pinnedNotes.forEach((note) => this.rendernote(note.getElement()));
    }
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
          message: "Note Deleted!",
        };
        chrome.notifications.create("deleteNote", notif);
        this.renderNotes();
      }
    );
  }

  handlePin(note) {
    const requiredNote = this.notes.find((eachNote) => eachNote === note);
    requiredNote.pinned = !requiredNote.pinned;
    chrome.storage.sync.set(
      {
        notes: this.notes,
      },
      () => {
        this.renderNotes();
      }
    );
  }

  addnote(note) {
    const noteobj = new Note(note, this, this.page);
    this.notes.push(noteobj);

    chrome.storage.sync.set(
      {
        notes: this.notes,
      },
      () => {
        const notif = {
          type: "basic",
          iconUrl: "tick.png",
          title: "Stick It!",
          message: "Note Created!",
        };
        chrome.notifications.create("createNote", notif);
        this.renderNotes();
      }
    );
  }
  stopdisplay() {
    this.el.innerHTML = " ";
  }
}
