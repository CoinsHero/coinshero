import BTC from './BTC';
import ETH from './ETH';
import USD from './USD';
import EUR from './EUR';
import NIS from './NIS';

const btc = new BTC();
const eth = new ETH();
const usd = new USD();
const eur = new EUR();
const nis = new NIS();

const targetCurrencies = {
  [btc.code]: btc,
  [eth.code]: eth,
  [usd.code]: usd,
  [eur.code]: eur,
  [nis.code]: nis
};

export default targetCurrencies;
