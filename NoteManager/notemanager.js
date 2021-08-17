import Note from '../NoteManager/Note.js';
import { setData, deleteData } from '../storage.js';
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
  renderNotes(event = 'normal-render') {
    this.el.innerHTML = '';
    if (event === 'normal-render') {
      this.notes.sort(this.compare);
    }
    if (this.page === 'all-page') {
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

  async removenote(note) {
    this.notes.splice(this.notes.indexOf(note), 1);
    await deleteData(note.id);
    const notif = {
      type: 'basic',
      iconUrl: '../assets/tick.png',
      title: 'Stick It!',
      message: 'Note Deleted!',
    };
    chrome.notifications.create('deleteNote', notif);
    this.renderNotes();
  }

  async handlePin(note) {
    const requiredNote = this.notes.find((eachNote) => eachNote === note);
    requiredNote.pinned = !requiredNote.pinned;
    //await setData(requiredNote);
    this.renderNotes();
  }

  async addnote(note) {
    const noteobj = new Note(note, this, this.page);
    await setData(noteobj);
    this.notes.push(noteobj);
    const notif = {
      type: 'basic',
      iconUrl: '../assets/tick.png',
      title: 'Stick It!',
      message: 'Note Created!',
    };
    chrome.notifications.create('createNote', notif);
    this.renderNotes();
  }
  stopdisplay() {
    this.el.innerHTML = ' ';
  }
  async clearNotes() {
    this.notes = [];
    //await setData(this.notes);
    this.renderNotes();
  }
}
