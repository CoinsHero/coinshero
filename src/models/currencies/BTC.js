import Currency from './Currency';

export default class BTC extends Currency {
  constructor() {
    super('BTC', 'Bitcoin', 'BTC', Currency.SYMBOL_LOCATION.END);
  }
}
