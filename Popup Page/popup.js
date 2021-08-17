import NoteManager from '../NoteManager/notemanager.js';
import { getData, getCurrentUser } from '../storage.js';
getData().then((data) => {
  console.log(data);
  const notemanager = new NoteManager({
    el: document.querySelector('.pinned-notes'),
    notes: data,
    page: 'popup',
  });
  notemanager.renderNotes();
});
window.onload = async () => {
  // if (!userString) {
  //   chrome.tabs.create({ url: './Install Page/index.html' });
  // }
  const user = await getCurrentUser();
  console.log(user);
  document.querySelector('.name').innerText = `Hello`;
};
