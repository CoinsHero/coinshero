import Currency from './Currency';

export default class BTC extends Currency {
  constructor() {
    super({
      code: 'BTC',
      name: 'Bitcoin',
      symbol: 'BTC',
      symbolLocation: Currency.SYMBOL_LOCATIONS.END,
      factorFromUSD: 100
    });
  }
}
