const menu = {
  id: "SanchitPranav",
  title: "Stick It!",
  contexts: ["selection", "image"],
};

let date = "",
  time = "";
const getTime = async () => {
  const response = await (
    await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
  ).json();
  const res = response.datetime.split("T");
  date = res[0];
  time = res[1].split(".")[0];
};

const getUrl = async () => {};

chrome.contextMenus.create(menu);
chrome.storage.sync.set({ notes: [] });
chrome.contextMenus.onClicked.addListener((data) => {
  if (data.menuItemId == "SanchitPranav" && data.selectionText) {
    const selectedText = data.selectionText;
    chrome.storage.sync.get("notes", async (data) => {
      console.log(data.notes);
      await getTime();
      chrome.tabs.query(
        { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
        (tabs) => {
          chrome.storage.sync.set(
            {
              notes: [
                ...data.notes,
                {
                  body: selectedText,
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
                message: "You note has been created!",
              };
              chrome.notifications.create("createNote", notif);
            }
          );
        }
      );
    });
  }
});
