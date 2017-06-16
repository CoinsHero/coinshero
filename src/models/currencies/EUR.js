import Currency from './Currency';

export default class EUR extends Currency {
  constructor() {
    super({
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      symbolLocation: Currency.SYMBOL_LOCATIONS.START
    });
  }
}
