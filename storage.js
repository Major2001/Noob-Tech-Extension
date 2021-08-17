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

export const signin = async () => {
  console.log("storage tk pahuncha")
    // chrome.runtime.sendMessage({ command: 'signin' }, (response) => {
    //   console.log(response);
    // });
    const dataPromise = new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ command: 'signin' }, () => {
        console.log("response de");
        resolve();
       });
    });
    await dataPromise;
    console.log("storage paar pahuncha")
  };