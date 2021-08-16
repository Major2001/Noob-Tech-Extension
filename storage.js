export const getData = async () => {
  const dataPromise = new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ command: 'fetch' }, (response) => {
      resolve(response);
    });
  });
  const data = await dataPromise;
  if (!data) {
    return [];
  }
  return data;
};

export const setData = async (newNote) => {
  const dataPromise = new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ command: 'set', data: newNote }, () => {
      resolve();
    });
  });
  await dataPromise;
};

export const deleteData = async (id) => {
  const dataPromise = new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ command: 'delete',id }, () => {
      resolve();
    });
  });
  await dataPromise;
};