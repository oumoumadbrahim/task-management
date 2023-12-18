export const localStorageHelper = {
  set: (key: any, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err: any) {
      console.error('[error]! Set (', key, ') => ', err.message);
    }
    return;
  },
  remove: (key: any) => {
    return localStorage.removeItem(key);
  },
  get: (key: any) => {
    let value = null;
    try {
      value = localStorage.getItem(key);
      if (value) {
        value = JSON.parse(value);
      }
    } catch (err: any) {
      console.error('[error]! Get (', key, ') => ', err.message);
    }
    return value;
  },
  clear: () => {
    return localStorage.clear();
  },
};
