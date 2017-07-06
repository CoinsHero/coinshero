import localStorageSettings from './localStorageSettings';

import BTC from '../models/currencies/BTC';
import ETH from '../models/currencies/ETH';
import USD from '../models/currencies/USD';
import EUR from '../models/currencies/EUR';
import ILS from '../models/currencies/ILS';
import GBP from '../models/currencies/GBP';
import RUB from '../models/currencies/RUB';

const btc = new BTC();
const eth = new ETH();
const usd = new USD();
const eur = new EUR();
const ils = new ILS();
const gbp = new GBP();
const rub = new RUB();

export const DEFAULT_TARGET_CURRENCY = usd;

export const regularTargetCurrencies = {
  [usd.code]: usd,
  [ils.code]: ils,
  [eur.code]: eur,
  [gbp.code]: gbp,
  [rub.code]: rub
};

const targetCurrencies = Object.assign({
  [btc.code]: btc,
  [eth.code]: eth
}, regularTargetCurrencies);

export const getRegularTargetCurrency = (code) => {
  return code && regularTargetCurrencies[code];
};

// We only allow regular currencies in the local storage in order to make things simpler when parsing all the coins in the system
export const setRegularTargetCurrencyLocalStorage = (targetCurrencyCode) => {
  if (getRegularTargetCurrency(targetCurrencyCode)) {
    localStorageSettings.setItem(localStorageSettings.KEYS.targetCurrencyCode, targetCurrencyCode);
  }
};

export default targetCurrencies;
