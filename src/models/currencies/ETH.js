import Currency from './Currency';

export default class ETH extends Currency {
  constructor() {
    super({
      code: 'ETH',
      name: 'Ethereum',
      symbol: 'ETH',
      symbolLocation: Currency.SYMBOL_LOCATIONS.END
    });
  }
}
