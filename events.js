const menu = {
  id: "SanchitPranav",
  title: "Stick It!",
  contexts: ["selection", "image"],
};

chrome.contextMenus.create(menu);
chrome.storage.sync.set({ notes: [] });
chrome.contextMenus.onClicked.addListener((data) => {
  if (data.menuItemId == "SanchitPranav" && data.selectionText) {
    const selectedText = data.selectionText;
    chrome.storage.sync.get("notes", (data) => {
      console.log(data.notes);
      chrome.storage.sync.set(
        { notes: [...data.notes, { text: selectedText }] },
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
    });
  }
});
