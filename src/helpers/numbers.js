export const round = (value, decimalNumbers = 2) => {
  if (decimalNumbers > 0) {
    return Math.round(value * Math.pow(10, decimalNumbers)) / Math.pow(10, decimalNumbers);
  } else {
    return Math.round(value);
  }
};

export const toCurrencyFormat = (value, locale = 'en') => {
  return Number(value).toLocaleString(locale);
};
