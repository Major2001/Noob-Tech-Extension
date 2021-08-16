import NoteManager from '../NoteManager/notemanager.js';
import { getData } from '../storage.js';
getData().then((data) => {
  console.log(data);
  const notemanager = new NoteManager({
    el: document.querySelector('.pinned-notes'),
    notes: data,
    page: 'popup',
  });
  notemanager.renderNotes();
});
window.onload = () => {
  const userString = localStorage.getItem('user');
  if (!userString) {
    chrome.tabs.create({ url: './Install Page/index.html' });
  }
  const user = JSON.parse(userString);
  document.querySelector('.name').innerText = `Hello ${user.userName}`;
};
