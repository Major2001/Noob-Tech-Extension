const menu = {
  id: "SanchitPranav",
  title: "Stick It!",
  contexts: ["selection", "image"],
};

let date = "",
  time = "";
const getTime = () => {
  const date_time = new Date();
  let str = date_time.toString().split(" ");
  date = `${str[1]} ${str[2]} ${str[3]}`;
  time = `${str[4]} ${str[5]}`;
};

chrome.contextMenus.create(menu);
chrome.storage.sync.set({ notes: [] });
chrome.contextMenus.onClicked.addListener((data) => {
  if (data.menuItemId == "SanchitPranav" && data.selectionText) {
    const selectedText = data.selectionText;
    chrome.storage.sync.get("notes", (data) => {
      getTime();
      chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        (tabs) => {
          chrome.storage.sync.set(
            {
              notes: [
                ...data.notes,
                {
                  title: "Note added",
                  body: selectedText,
                  time: time,
                  date: date,
                  url: tabs[0].url,
                  pinned: false,
                },
              ],
            },
            () => {
              const notif = {
                type: "basic",
                iconUrl: "tick.png",
                title: "Stick It!",
                message: "You note has been created!",
              };
              chrome.notifications.create("createNote", notif);
            }
          );
        }
      );
    });
  } else {
    if (data.mediaType == "image") {
      var tempdiv = `<img src="${data.srcUrl}" class="note-image">`;
      chrome.storage.sync.get("notes", async (data) => {
        getTime();
        chrome.tabs.query(
          { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
          (tabs) => {
            chrome.storage.sync.set(
              {
                notes: [
                  ...data.notes,
                  {
                    title: "Note added",
                    body: tempdiv,
                    time: time,
                    date: date,
                    url: tabs[0].url,
                  },
                ],
              },
              () => {
                const notif = {
                  type: "basic",
                  iconUrl: "tick.png",
                  title: "Stick It!",
                  message: "Note Created!",
                };
                chrome.notifications.create("createNote", notif);
              }
            );
          }
        );
      });
    }
  }
});

chrome.storage.onChanged.addListener(function (changes, storageName) {
  chrome.storage.sync.get("notes", (data) => {
    chrome.browserAction.setBadgeText({ text: data.notes.length.toString() });
  });
});
