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
    chrome.runtime.sendMessage({ command: 'delete', id }, () => {
      resolve();
    });
  });
  await dataPromise;
};

export const signin = async () => {
  // chrome.runtime.sendMessage({ command: 'signin' }, (response) => {
  //   console.log(response);
  // });
  const dataPromise = new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ command: 'signin' }, () => {
      resolve();
    });
  });
  await dataPromise;
};

export const getCurrentUser = async () => {
  const userPromise = new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ command: 'getCurrentUser' }, (response) => {
      resolve(response);
    });
  });
  const user = await userPromise;

  return user;
};
export const logout = async () => {
  const dataPromise = new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ command: 'logout' }, () => {
      resolve();
    });
  });
  await dataPromise;
};
