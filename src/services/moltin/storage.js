const storage = new Map();
const storageAdapter = {
  set: (key, value) => {
    storage.set(key, value);
  },

  get: key => {
    if (!storage.has(key)) {
      return JSON.stringify({});
    } else {
      return storage.get(key);
    }
  },

  delete: key => {
    return storage.delete(key);
  }
};

export default storageAdapter;
