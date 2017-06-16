import Currency from './Currency';

export default class ETH extends Currency {
  constructor() {
    super('ETH', 'Ethereum', 'ETH', Currency.SYMBOL_LOCATIONS.END);
  }
}
