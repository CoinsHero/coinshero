import Currency from './Currency';

export default class USD extends Currency {
  constructor() {
    super({
      code: 'USD',
      symbol: '$',
      symbolLocation: Currency.SYMBOL_LOCATIONS.START,
      factorFromUSD: 1
    });

    this.translationKey = 'TARGET_CURRENCY_USD';
  }
}
