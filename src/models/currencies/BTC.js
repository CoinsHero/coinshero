import Currency from './Currency';

export default class BTC extends Currency {
  constructor() {
    super({
      code: 'BTC',
      symbol: 'BTC',
      symbolLocation: Currency.SYMBOL_LOCATIONS.END
    });

    this.translationKey = 'TARGET_CURRENCY_BTC';
  }
}
