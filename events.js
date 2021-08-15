import { getDataFirebase, setDataFirebase } from "./firebase.js";

const contexts = ["selection", "image"];
const menu = {
  id: "SanchitPranav",
  title: "Stick It!",
  contexts: contexts,
};

let date = "",
  time = "";

const getTime = () => {
  const date_time = new Date();
  let str = date_time.toString().split(" ");
  date = `${str[1]} ${str[2]} ${str[3]}`;
  time = `${str[4]} ${str[5]}`;
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
  if (data.menuItemId == "SanchitPranav" && data.selectionText) {
    const selectedText = data.selectionText;
    let notes = (await getDataFirebase()) || [];
    console.log(notes);
    let tabUrl = await url();
    getTime();
    await setDataFirebase([
      ...notes,
      {
        title: "Note added",
        body: selectedText,
        time: time,
        date: date,
        url: tabUrl,
        pinned: false,
      },
    ]);
    const notif = {
      type: "basic",
      iconUrl: "./assets/tick.png",
      title: "Stick It!",
      message: "Note Created!",
    };
    chrome.notifications.create("createNote", notif);
  } else {
    if (data.mediaType == "image") {
      var tempdiv = `<img src="${data.srcUrl}" class="note-image">`;
      let notes = await getDataFirebase();
      getTime();
      let tabUrl = await url();
      await setDataFirebase([
        ...notes,
        {
          title: "Note added",
          body: tempdiv,
          time: time,
          date: date,
          url: tabUrl,
          pinned: false,
        },
      ]);
      const notif = {
        type: "basic",
        iconUrl: "./assets/tick.png",
        title: "Stick It!",
        message: "Note Created!",
      };
      chrome.notifications.create("createNote", notif);
    }
  }
});

chrome.storage.onChanged.addListener(async function (changes, storageName) {
  let notes = await getDataFirebase();
  
});
