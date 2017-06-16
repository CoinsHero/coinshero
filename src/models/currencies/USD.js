import Currency from './Currency';

export default class USD extends Currency {
  constructor() {
    super({
      code: 'USD',
      name: 'USD',
      symbol: '$',
      symbolLocation: Currency.SYMBOL_LOCATIONS.START
    });
  }
}
