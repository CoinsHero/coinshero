import {NO_VALUE_DATA_SYMBOL} from './consts';

export const round = (value, decimalNumbers = 2) => {
  if (decimalNumbers > 0) {
    return Math.round(value * Math.pow(10, decimalNumbers)) / Math.pow(10, decimalNumbers);
  } else {
    return Math.round(value);
  }
};

export const toCurrencyFormat = (value, localeCode = 'en', decimalNumbers = 2) => {
  return Number(value).toLocaleString(localeCode, {minimumFractionDigits: decimalNumbers});
};

export const safeParseInt = (value) => {
  return value === NO_VALUE_DATA_SYMBOL ? NO_VALUE_DATA_SYMBOL : parseInt(value);
};

export const safeParseFloat = (value) => {
  return value === NO_VALUE_DATA_SYMBOL ? NO_VALUE_DATA_SYMBOL : parseFloat(value);
};
