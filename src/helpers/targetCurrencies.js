import BTC from '../models/currencies/BTC';
import ETH from '../models/currencies/ETH';
import USD from '../models/currencies/USD';
import EUR from '../models/currencies/EUR';
import NIS from '../models/currencies/NIS';

const btc = new BTC();
const eth = new ETH();
const usd = new USD();
const eur = new EUR();
const nis = new NIS();

export const DEFAULT_TARGET_CURRENCY = usd;

const targetCurrencies = {
  [btc.code]: btc,
  [eth.code]: eth,
  [usd.code]: usd,
  [eur.code]: eur,
  [nis.code]: nis
};

export default targetCurrencies;
