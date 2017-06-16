import Currency from './Currency';

export default class USD extends Currency {
  constructor() {
    super('USD', 'USD', '$', Currency.SYMBOL_LOCATION.START);
  }
}
