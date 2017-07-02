const MAIN_KEY = 'coins_main';

const KEYS = {
  isDarkTheme: 'isDarkTheme',
  localeCode: 'localeCode',
  targetCurrencyCode: 'targetCurrencyCode'
};

const validate = (key) => {
  if (!localStorage) {
    console.warn('localStorage: localStorage is not available');
    return false;
  } else if (typeof key !== 'string' || !KEYS[key]) {
    console.warn('localStorage: Invalid key. Ket must be one of the defined KEYS object');
    return false;
  }

  return true;
};

const getMainObject = () => {
  return JSON.parse(localStorage.getItem(MAIN_KEY)) || {};
};

const setItem = (key, value) => {
  if (validate(key)) {
    try {
      const values = getMainObject();
      values[key] = value;
      localStorage.setItem(MAIN_KEY, JSON.stringify(values));
    } catch (e) {
      console.warn('localStorage: Oops.. Something went wrong during the operation');
    }
  }
};

const getItem = (key, defaultValue) => {
  let value = defaultValue;

  if (validate(key)) {
    try {
      const values = getMainObject();
      value = values[key];
    } catch (e) {
      console.warn('localStorage: Oops.. Something went wrong during the operation');
    }
  }

  return value;
};

const removeItem = (key) => {
  if (validate(key)) {
    try {
      const values = getMainObject();
      delete values[key];
      localStorage.setItem(MAIN_KEY, JSON.stringify(values));
    } catch (e) {
      console.warn('localStorage: Oops.. Something went wrong during the operation');
    }
  }
};

export default {
  setItem,
  getItem,
  removeItem,
  KEYS
};
