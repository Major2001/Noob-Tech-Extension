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
  const user = await getCurrentUser();
  if (!user) {
    chrome.tabs.create({ url: './Install Page/index.html' });
  }
  document.querySelector('.name').innerText = `Hello ${user.displayName}`;
};
