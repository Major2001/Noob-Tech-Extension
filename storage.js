export const getData = async () => {
  const dataPromise = new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ command: "fetch" }, (response) => {
      resolve(response);
    });
  });
  const data = await dataPromise;
  return data || [];
};

export const setData = async (notesArray) => {
  const dataPromise = new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ command: "set", data: notesArray }, () => {
      resolve();
    });
  });
  await dataPromise;
};
