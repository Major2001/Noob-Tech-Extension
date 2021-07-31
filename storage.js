export const getData = async () => {
  const retriveDataPromise = new Promise((resolve, reject) => {
    chrome.storage.sync.get("notes", (data) => {
      resolve(data.notes);
    });
  });
  const data = await retriveDataPromise;
  return data;
};

export const setData = async (notesArray) => {
  const setDataPromise = new Promise((resolve, reject) => {
    chrome.storage.sync.set(
      {
        notes: notesArray,
      },
      () => {
        resolve();
      }
    );
  });
  await setDataPromise;
};
