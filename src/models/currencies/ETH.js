import Currency from './Currency';

export default class ETH extends Currency {
  constructor() {
    super({
      code: 'ETH',
      symbol: 'ETH',
      symbolLocation: Currency.SYMBOL_LOCATIONS.END
    });

    this.translationKey = 'TARGET_CURRENCY_ETH';
  }
}
