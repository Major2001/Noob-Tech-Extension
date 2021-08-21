import {
  getDataFirebase,
  setDataFirebase,
  getCurrentUser,
} from './firebase.js';

chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.create({ url: './Install Page/index.html' });
});
const contexts = ['selection', 'image'];
const menu = {
  id: 'SanchitPranav',
  title: 'Stick It!',
  contexts: contexts,
};

const getDT = () => {
  const date_time = new Date();
  let str = date_time.toString().split(' ');
  let date = `${str[1]} ${str[2]} ${str[3]}`;
  let time = `${str[4]} ${str[5]}`;
  return { date, time };
};

const url = async () => {
  const tabPromise = new Promise((resolve, reject) => {
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      (tabs) => {
        resolve(tabs[0].url);
      }
    );
  });
  return await tabPromise;
};

chrome.contextMenus.create(menu);
chrome.storage.sync.set({ notes: [] });
chrome.contextMenus.onClicked.addListener(async (data) => {
  const user = getCurrentUser();
  if (!user) {
    chrome.tabs.create({ url: './Install Page/index.html' });
  }
  const uid = user.uid;
  console.log(uid);
  let tabUrl = await url();
  const dt = getDT();
  if (data.menuItemId == 'SanchitPranav' && data.selectionText) {
    const selectedText = data.selectionText;
    await setDataFirebase({
      title: 'Note added',
      body: selectedText,
      time: dt.time,
      date: dt.date,
      url: tabUrl,
      pinned: false,
      uid,
    });
    const notif = {
      type: 'basic',
      iconUrl: './assets/tick.png',
      title: 'Stick It!',
      message: 'Note Created!',
    };
    chrome.notifications.create('createNote', notif);
  } else {
    if (data.mediaType == 'image') {
      var tempdiv = `<img src="${data.srcUrl}" class="note-image">`;
      await setDataFirebase({
        title: 'Note added',
        body: tempdiv,
        time: dt.time,
        date: dt.date,
        url: tabUrl,
        pinned: false,
        uid,
      });
      const notif = {
        type: 'basic',
        iconUrl: './assets/tick.png',
        title: 'Stick It!',
        message: 'Note Created!',
      };
      chrome.notifications.create('createNote', notif);
    }
  }
});

chrome.storage.onChanged.addListener(async function (changes, storageName) {
  let notes = await getDataFirebase();
});
