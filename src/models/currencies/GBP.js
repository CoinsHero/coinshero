import Currency from './Currency';

export default class GBP extends Currency {
  constructor() {
    super({
      code: 'GBP',
      symbol: '£',
      symbolLocation: Currency.SYMBOL_LOCATIONS.START
    });

    this.translationKey = 'TARGET_CURRENCY_GBP';
  }
}
