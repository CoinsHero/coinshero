import Currency from './Currency';

export default class RUB extends Currency {
  constructor() {
    super({
      code: 'RUB',
      symbol: '₽',
      symbolLocation: Currency.SYMBOL_LOCATIONS.END
    });

    this.translationKey = 'TARGET_CURRENCY_RUB';
  }
}
