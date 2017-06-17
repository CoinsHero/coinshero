import {round, toCurrencyFormat} from '../../helpers/numbers';
class Currency {
  constructor(options) {
    /**
     *
     * @type {string}
     */
    this.code = options.code;
    /**
     *
     * @type {string}
     */
    this.name = options.name;
    /**
     * A symbol (like $) to show next to the currency value
     * @type {string}
     */
    this.symbol = options.symbol;
    /**
     * If the symbol of the currency should appear at the start or the end of the price
     * @type {Currency.SYMBOL_LOCATIONS}
     */
    this.symbolLocation = Currency.SYMBOL_LOCATIONS[options.symbolLocation] || Currency.SYMBOL_LOCATIONS.START;
  }

  static adjustCurrencyValue(currency, value, decimalNumbers = 2, localeCode = 'en') {
    round(value, decimalNumbers);
    value = toCurrencyFormat(value, localeCode);

    return currency.symbolLocation === Currency.SYMBOL_LOCATIONS.START ?
      `${currency.symbol}${value}` :
      `${value} ${currency.symbol}`;
  }
}

Currency.SYMBOL_LOCATIONS = {
  START: 's',
  END: 'e'
};

export default Currency;
