import Currency from './Currency';

export default class USD extends Currency {
  constructor() {
    super({
      code: 'NIS',
      symbol: '₪',
      symbolLocation: Currency.SYMBOL_LOCATIONS.START,
      // TODO: Change temp value
      factorFromUSD: 3.49
    });

    this.translationKey = 'TARGET_CURRENCY_NIS';
  }
}
