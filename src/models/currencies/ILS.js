import Currency from './Currency';

export default class ILS extends Currency {
  constructor() {
    super({
      code: 'ILS',
      symbol: '₪',
      symbolLocation: Currency.SYMBOL_LOCATIONS.START
    });

    this.translationKey = 'TARGET_CURRENCY_ILS';
  }
}
