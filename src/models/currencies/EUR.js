import Currency from './Currency';

export default class EUR extends Currency {
  constructor() {
    super('EUR', 'Euro', '€', Currency.SYMBOL_LOCATION.START);
  }
}
