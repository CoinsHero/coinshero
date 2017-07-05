import Currency from './Currency';

export default class EUR extends Currency {
  constructor() {
    super({
      code: 'EUR',
      symbol: '€',
      symbolLocation: Currency.SYMBOL_LOCATIONS.START
    });

    this.translationKey = 'TARGET_CURRENCY_EUR';
  }
}
